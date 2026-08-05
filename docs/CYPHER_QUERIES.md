# 🔍 NexusMap — Cypher Queries Reference

> Every query parameterised. Every query explained. Every query justified.
> Bounded limits: Search = **1..3 hops**; Shortest Path = **1..5 hops**.

---

## Query 1: Network Search (Multi-hop with 4-Tier Ranking)
**Purpose**: Search for people within 3 degrees of separation with PRD-compliant 4-tier ranking  
**Assignment Req**: Multi-hop traversal (2+ hops) ✅

```cypher
// Find people matching a search query within 3 degrees, with complete 4-tier ranking
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
```
**Why graph?**: Implements 4-tier ranking (degree ASC -> mutual count DESC -> relationship strength DESC -> name ASC) directly in openCypher.

---

## Query 2: Shortest Warm Path ⭐ (Hero Feature)
**Purpose**: Find the shortest introduction chain between two people (bounded to 5 hops, supporting optional `fromId`)  
**Assignment Req**: Multi-hop traversal ✅ + Relational DB finds awkward ✅

```cypher
// Find shortest path from source (default root) to target person (max 5 hops)
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
```

---

## Query 3: Mutual Connections
```cypher
// People both you and the target know
MATCH (me:Person {isRoot: true})-[:KNOWS]-(mutual:Person)-[:KNOWS]-(target:Person {id: $targetId})
RETURN mutual.id AS id, 
       mutual.name AS name, 
       mutual.title AS title,
       mutual.avatarUrl AS avatar
ORDER BY mutual.name ASC
```

---

## Query 4: Company Network Explorer (Multi-hop)
```cypher
// Find people at a company reachable through your network (max 3 hops)
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
```

---

## Query 5: Super-Connectors (Network Analytics)
```cypher
// Find people with highest connection count (degree centrality)
MATCH (p:Person)-[r:KNOWS]-()
WITH p, count(r) AS connections
RETURN p.id AS id, 
       p.name AS name, 
       p.title AS title,
       p.avatarUrl AS avatar, 
       connections
ORDER BY connections DESC
LIMIT 10
```

---

## Query 6: Skill-Based Discovery
```cypher
// Find people with a skill reachable through your network (max 3 hops)
MATCH path = (me:Person {isRoot: true})-[:KNOWS*1..3]-(p:Person)-[:HAS_SKILL]->(s:Skill {name: $skillName})
WITH me, p, min(length(path)) AS degree, s
RETURN p.id AS id, 
       p.name AS name, 
       p.title AS title,
       p.avatarUrl AS avatar, 
       degree, 
       s.name AS skill
ORDER BY degree ASC, p.name ASC
LIMIT $limit
```

---

## Query 7: Network Stats (Dashboard)
```cypher
// Get network overview stats
MATCH (me:Person {isRoot: true})
OPTIONAL MATCH (me)-[:KNOWS]-(direct:Person)
WITH me, count(DISTINCT direct) AS directCount
OPTIONAL MATCH (me)-[:KNOWS*1..2]-(p2:Person) WHERE p2 <> me
WITH me, directCount, count(DISTINCT p2) AS reach2Hops
OPTIONAL MATCH (me)-[:KNOWS*1..3]-(p3:Person) WHERE p3 <> me
RETURN directCount, reach2Hops, count(DISTINCT p3) AS totalReachable
```

---

## Query 8: Person Full Profile
```cypher
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
       collect(DISTINCT {company: c.name, role: w.role, current: w.isCurrent, start: w.startDate, end: w.endDate}) AS workHistory,
       collect(DISTINCT {skill: sk.name, category: sk.category, proficiency: s.proficiency}) AS skills,
       collect(DISTINCT {university: u.name, degree: st.degree, field: st.field}) AS education,
       l.city + ', ' + l.country AS location
```

---

## Query 9: Graph Visualization Subgraph
```cypher
MATCH (me:Person {isRoot: true})-[r:KNOWS*1..2]-(p:Person)
WITH DISTINCT p, me
MATCH (p)-[k:KNOWS]-(connected:Person)
WHERE (me)-[:KNOWS*1..2]-(connected) AND id(p) < id(connected)
RETURN collect(DISTINCT {id: p.id, name: p.name, title: p.title, avatar: p.avatarUrl}) AS nodes,
       collect(DISTINCT {source: p.id, target: connected.id, strength: k.strength}) AS edges
```
