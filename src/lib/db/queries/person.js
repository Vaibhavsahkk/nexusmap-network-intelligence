import { executeQuery } from '../driver.js';

export async function getPersonProfile(personId) {
  const cypher = `
    MATCH (p:Person {id: $personId})
    OPTIONAL MATCH (me:Person {isRoot: true})
    OPTIONAL MATCH path = shortestPath((me)-[:KNOWS*1..5]-(p))
    OPTIONAL MATCH (p)-[w:WORKED_AT]->(c:Company)
    OPTIONAL MATCH (p)-[s:HAS_SKILL]->(sk:Skill)
    OPTIONAL MATCH (p)-[st:STUDIED_AT]->(u:University)
    OPTIONAL MATCH (p)-[:LOCATED_IN]->(l:Location)
    RETURN p.id AS id,
           p.name AS name,
           p.title AS title,
           p.email AS email,
           p.bio AS bio,
           p.avatarUrl AS avatar,
           p.linkedinUrl AS linkedinUrl,
           p.twitterHandle AS twitterHandle,
           coalesce(length(path), 0) AS connectionDegree,
           collect(DISTINCT {company: c.name, role: w.role, current: w.isCurrent}) AS workHistory,
           collect(DISTINCT {name: sk.name, category: sk.category, proficiency: s.proficiency}) AS skills,
           collect(DISTINCT {university: u.name, degree: st.degree, field: st.field}) AS education,
           l.city + ', ' + l.country AS location
  `;

  const records = await executeQuery(cypher, { personId });
  if (records.length === 0 || !records[0].get('id')) {
    return null;
  }

  const r = records[0];
  return {
    person: {
      id: r.get('id'),
      name: r.get('name'),
      title: r.get('title'),
      email: r.get('email'),
      bio: r.get('bio'),
      avatar: r.get('avatar'),
      linkedinUrl: r.get('linkedinUrl'),
      twitterHandle: r.get('twitterHandle'),
    },
    connectionDegree: r.get('connectionDegree'),
    workHistory: r.get('workHistory').filter((w) => w.company !== null),
    skills: r.get('skills').filter((s) => s.name !== null),
    education: r.get('education').filter((e) => e.university !== null),
    location: r.get('location'),
  };
}
