import { executeQuery } from '../driver.js';

export async function searchNetwork(query, limit = 20) {
  const cypher = `
    MATCH path = (me:Person {isRoot: true})-[:KNOWS*1..3]-(p:Person)
    WHERE (toLower(p.name) CONTAINS toLower($query) OR toLower(p.title) CONTAINS toLower($query))
      AND p <> me
    WITH me, p, min(length(path)) AS degree
    OPTIONAL MATCH (me)-[r1:KNOWS]-(mutual:Person)-[r2:KNOWS]-(p)
    WITH p, degree, count(DISTINCT mutual) AS mutualCount, max(coalesce(r1.strength, 0)) AS maxStrength
    RETURN p.id AS id, 
           p.name AS name, 
           p.title AS title,
           p.avatarUrl AS avatar, 
           p.email AS email, 
           degree,
           mutualCount,
           maxStrength
    ORDER BY degree ASC, mutualCount DESC, maxStrength DESC, p.name ASC
    LIMIT $limit
  `;
  
  const records = await executeQuery(cypher, { query, limit: parseInt(limit, 10) });
  return records.map((record) => ({
    id: record.get('id'),
    name: record.get('name'),
    title: record.get('title'),
    avatar: record.get('avatar'),
    email: record.get('email'),
    degree: record.get('degree'),
    mutualCount: record.get('mutualCount'),
    maxStrength: record.get('maxStrength'),
  }));
}
