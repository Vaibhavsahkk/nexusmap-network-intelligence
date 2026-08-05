import { executeQuery } from '../driver.js';

export async function findShortestPath(targetId, fromId = null) {
  const cypher = `
    MATCH (start:Person {id: coalesce($fromId, "root-user-id")})
    MATCH (target:Person {id: $targetId})
    MATCH path = shortestPath((start)-[:KNOWS*1..5]-(target))
    RETURN [n IN nodes(path) | {
      id: n.id, 
      name: n.name, 
      title: n.title, 
      avatar: n.avatarUrl
    }] AS people,
    [r IN relationships(path) | {
      strength: r.strength, 
      since: r.since, 
      source: r.source
    }] AS connections,
    length(path) AS hops
  `;

  const records = await executeQuery(cypher, { targetId, fromId });
  if (records.length === 0) {
    return { found: false, message: 'No connection path found within 5 degrees' };
  }

  const record = records[0];
  return {
    found: true,
    hops: record.get('hops'),
    people: record.get('people'),
    connections: record.get('connections'),
  };
}
