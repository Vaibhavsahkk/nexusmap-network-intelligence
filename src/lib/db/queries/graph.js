import { executeQuery } from '../driver.js';

export async function getGraphData() {
  const cypher = `
    MATCH (me:Person {isRoot: true})-[r:KNOWS*1..2]-(p:Person)
    WITH me, collect(DISTINCT p) AS peerNodes
    WITH [me] + peerNodes AS allNodes
    UNWIND allNodes AS n1
    UNWIND allNodes AS n2
    WITH allNodes, n1, n2 WHERE id(n1) < id(n2)
    OPTIONAL MATCH (n1)-[k:KNOWS]-(n2)
    WITH allNodes, collect(CASE WHEN k IS NOT NULL THEN {source: n1.id, target: n2.id, strength: k.strength} END) AS rawLinks
    RETURN [n IN allNodes | {id: n.id, name: n.name, title: n.title, avatar: n.avatarUrl, isRoot: coalesce(n.isRoot, false)}] AS nodes,
           [l IN rawLinks WHERE l IS NOT NULL] AS links
  `;

  try {
    const records = await executeQuery(cypher);
    if (records.length === 0) {
      return { nodes: [], links: [] };
    }

    const r = records[0];
    const rawNodes = r.get('nodes') || [];
    const rawLinks = r.get('links') || [];

    // Deduplicate nodes by id
    const nodeMap = new Map();
    rawNodes.forEach((node) => {
      if (node && node.id && !nodeMap.has(node.id)) {
        nodeMap.set(node.id, node);
      }
    });

    const validNodes = Array.from(nodeMap.values());
    const validNodeIds = new Set(validNodes.map((n) => n.id));

    // Ensure links ONLY contain sources and targets present in validNodes
    const validLinks = rawLinks.filter(
      (link) => link && validNodeIds.has(link.source) && validNodeIds.has(link.target)
    );

    return {
      nodes: validNodes,
      links: validLinks,
    };
  } catch (err) {
    console.error('getGraphData error:', err);
    return { nodes: [], links: [] };
  }
}
