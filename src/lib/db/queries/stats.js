import { executeQuery } from '../driver.js';

export async function getNetworkStats() {
  const cypher = `
    MATCH (me:Person {isRoot: true})
    OPTIONAL MATCH (me)-[:KNOWS]-(direct:Person)
    WITH me, count(DISTINCT direct) AS directCount
    OPTIONAL MATCH (me)-[:KNOWS*1..2]-(p2:Person) WHERE p2 <> me
    WITH me, directCount, count(DISTINCT p2) AS reach2Hops
    OPTIONAL MATCH (me)-[:KNOWS*1..3]-(p3:Person) WHERE p3 <> me
    RETURN directCount, reach2Hops, count(DISTINCT p3) AS totalReachable
  `;

  const records = await executeQuery(cypher);
  if (records.length === 0) {
    return { directCount: 0, reach2Hops: 0, totalReachable: 0 };
  }

  const r = records[0];
  return {
    directCount: r.get('directCount') || 0,
    reach2Hops: r.get('reach2Hops') || 0,
    totalReachable: r.get('totalReachable') || 0,
  };
}
