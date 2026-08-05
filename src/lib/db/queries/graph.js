import { executeQuery } from '../driver.js';

export async function getGraphData() {
  const cypher = `
    MATCH (me:Person {isRoot: true})-[r:KNOWS*1..2]-(p:Person)
    WITH DISTINCT p, me
    MATCH (p)-[k:KNOWS]-(connected:Person)
    WHERE (me)-[:KNOWS*1..2]-(connected) AND id(p) < id(connected)
    RETURN collect(DISTINCT {id: p.id, name: p.name, title: p.title, avatar: p.avatarUrl, isRoot: p.isRoot}) AS nodes,
           collect(DISTINCT {source: p.id, target: connected.id, strength: k.strength}) AS links
  `;

  const records = await executeQuery(cypher);
  if (records.length === 0) {
    return { nodes: [], links: [] };
  }

  const r = records[0];
  return {
    nodes: r.get('nodes') || [],
    links: r.get('links') || [],
  };
}
