import { executeQuery } from '../driver.js';

export async function getCompanyNetwork(companyId, limit = 20) {
  const cypher = `
    MATCH path = (me:Person {isRoot: true})-[:KNOWS*1..3]-(p:Person)-[:WORKED_AT {isCurrent: true}]->(c:Company {id: $companyId})
    WITH p, min(length(path)) AS degree, c
    OPTIONAL MATCH (c)-[:IN_INDUSTRY]->(ind:Industry)
    RETURN p.id AS id, 
           p.name AS name, 
           p.title AS title, 
           p.avatarUrl AS avatar, 
           degree,
           c.name AS company,
           ind.name AS industry
    ORDER BY degree ASC, p.name ASC
    LIMIT $limit
  `;

  const records = await executeQuery(cypher, { companyId, limit: parseInt(limit, 10) });
  return records.map((r) => ({
    id: r.get('id'),
    name: r.get('name'),
    title: r.get('title'),
    avatar: r.get('avatar'),
    degree: r.get('degree'),
    company: r.get('company'),
    industry: r.get('industry'),
  }));
}
