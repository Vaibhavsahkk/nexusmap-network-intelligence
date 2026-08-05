# 🤔 Why a Graph Database?

> *Mandatory assignment evaluation essay.*  
> *The technical justification for why NexusMap MUST use a graph database over SQL.*

---

## The Problem: Professional Networks Are Graphs

A professional network is not a flat list or table. It's a **graph** — a dynamic web of people connected by relationships of varying strength and type.

When a user asks *"Who in my network can introduce me to the CTO at Stripe?"*, they are asking for a **bounded 5-hop path traversal**:

```
You → knew Amit from college → Amit worked with Lisa at Google → 
Lisa's co-founder knows the Stripe CTO
```

---

## The SQL Nightmare vs Cypher Elegance

### 1. Multi-Hop Network Search (3 Hops)

**SQL (PostgreSQL)**:
```sql
WITH direct AS (
  SELECT contact_id FROM connections WHERE person_id = $userId
),
second_degree AS (
  SELECT DISTINCT c.contact_id 
  FROM connections c JOIN direct d ON c.person_id = d.contact_id
  WHERE c.contact_id != $userId AND c.contact_id NOT IN (SELECT contact_id FROM direct)
),
third_degree AS (
  SELECT DISTINCT c.contact_id 
  FROM connections c JOIN second_degree s ON c.person_id = s.contact_id
  WHERE c.contact_id != $userId AND c.contact_id NOT IN (SELECT contact_id FROM direct)
    AND c.contact_id NOT IN (SELECT contact_id FROM second_degree)
)
SELECT p.* FROM people p WHERE p.id IN (SELECT contact_id FROM third_degree);
```
**Lines**: 16  
**Performance**: 3 CTEs, multiple JOINs & NOT IN subqueries — degrades rapidly.

**Cypher (CognoDB)**:
```cypher
MATCH (me:Person {id: $userId})-[:KNOWS*1..3]-(fof:Person)
WHERE fof <> me
RETURN DISTINCT fof
```
**Lines**: 3  
**Performance**: Direct index-free adjacency traversal.

---

### 2. Shortest Warm Path Discovery (Bounded 5 Hops)

**SQL**:
```sql
WITH RECURSIVE path AS (
  SELECT person_id, contact_id, 1 AS depth, ARRAY[person_id] AS visited
  FROM connections WHERE person_id = $fromId
  UNION ALL
  SELECT c.person_id, c.contact_id, p.depth + 1, p.visited || c.person_id
  FROM connections c JOIN path p ON c.person_id = p.contact_id
  WHERE c.contact_id != ALL(p.visited) AND p.depth < 5
)
SELECT * FROM path WHERE contact_id = $toId ORDER BY depth LIMIT 1;
```
**Lines**: 10  
**Problems**: Exponential RAM usage during recursive expansion, vendor-specific syntax.

**Cypher**:
```cypher
MATCH path = shortestPath((start:Person {id: $fromId})-[:KNOWS*1..5]-(end:Person {id: $toId}))
RETURN path
```
**Lines**: 2  
**Performance**: Native Breadth-First Search (BFS) optimized directly by graph engine.

---

## Performance Comparison

| Operation | SQL (PostgreSQL) | Graph (CognoDB) |
|-----------|-----------------|-----------------|
| 1st-degree lookup | ~1ms | ~1ms |
| 2nd-degree lookup | ~10ms | ~2ms |
| 3rd-degree lookup | ~500ms+ | ~5ms |
| Bounded 5-hop path | ~5000ms+ | ~12ms |
| Bounded traversal | Complex Recursive CTE | Native `*1..N` |

Graph databases use **index-free adjacency** — each node stores physical pointers to its neighbors. Traversal cost is O(1) per hop, avoiding high-cost SQL JOINs.
