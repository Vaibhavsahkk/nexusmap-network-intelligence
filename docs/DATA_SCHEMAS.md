# 📊 NexusMap — Graph Data Schemas

> The heart of the application. Every node, every relationship, every property.

---

## 1. Data Model Diagram

```
                    ┌─────────────┐
                    │  INDUSTRY   │
                    └──────▲──────┘
                      IN_INDUSTRY
                           │
┌──────────────┐    ┌──────┴──────┐    ┌──────────────┐
│   LOCATION   │◄───│   COMPANY   │    │  UNIVERSITY  │
└──────▲───────┘    └──────▲──────┘    └──────▲───────┘
       │              WORKED_AT           STUDIED_AT
   LOCATED_IN         │                      │
       │    ┌─────────┴──────────────────────┤
       │    │          PERSON                │
       │    │  id, name, title, email, bio   │
       │    └───┬────────────┬───────────────┘
       │        │            │
    HAS_SKILL  KNOWS      ATTENDED
       │        │            │
┌──────▼──────┐ ▼     ┌──────▼──────┐
│    SKILL    │PERSON  │    EVENT    │
└─────────────┘        └─────────────┘
```

---

## 2. Node Schemas

### Person (Primary Entity) — ~150 nodes
```cypher
(:Person {
  id: String,          // UUID primary key; root user is seeded with id "root-user-id"
  name: String,        // "Priya Sharma"
  title: String,       // "Senior Software Engineer"
  email: String,       // "priya@example.com"
  bio: String,         // Short professional bio
  avatarUrl: String,   // Generated via DiceBear API: https://api.dicebear.com/9.x/initials/svg?seed=Priya%20Sharma
  linkedinUrl: String, // LinkedIn profile URL
  twitterHandle: String,
  isRoot: Boolean      // true = the "current user" node
})
```
The seed script must create exactly one root person with `id = "root-user-id"` and `isRoot = true` so path queries always have a deterministic source node.
**Indexes**: `Person.id`, `Person.name`

### Company — ~40 nodes
```cypher
(:Company {
  id: String, name: String, domain: String,
  size: String,     // "1001-5000"
  founded: Integer, // 2010
  website: String, logo: String
})
```

### Skill — ~50 nodes
```cypher
(:Skill { id: String, name: String, category: String })
```

### University — ~20 nodes
```cypher
(:University { id: String, name: String, location: String, ranking: Integer })
```

### Location — ~15 nodes
```cypher
(:Location { id: String, city: String, country: String, lat: Float, lng: Float })
```

### Industry — ~12 nodes
```cypher
(:Industry { id: String, name: String })
```

### Event — ~20 nodes
```cypher
(:Event { id: String, name: String, date: String, type: String, location: String })
```

---

## 3. Relationship Schemas & Edge Directionality Rule

### `KNOWS` (Person → Person) — ~600 edges
```cypher
[:KNOWS {
  strength: Integer,  // 1-10
  since: String,      // "2022-03"
  source: String,     // "linkedin"|"email"|"event"|"work"|"university"
  notes: String       // Optional context
}]
```
> **Edge Storage Rule**: To prevent duplicate relations and incorrect degree counts, the seed script creates exactly **ONE** directed edge per pair: `(p1)-[:KNOWS]->(p2)` where `p1.id < p2.id`. All Cypher queries traverse undirectionally: `(p1)-[:KNOWS]-(p2)` (without arrows).

### `WORKED_AT` (Person → Company) — ~200 edges
### `STUDIED_AT` (Person → University) — ~100 edges
### `HAS_SKILL` (Person → Skill) — ~300 edges
### `LOCATED_IN` — ~100 edges
### `IN_INDUSTRY` — ~40 edges
### `ATTENDED` — ~80 edges

---

## 4. Small-World Seed Topology Algorithm (Watts-Strogatz + Hubs)

Rather than random mock connections, `scripts/seed.mjs` uses a deterministic **Watts-Strogatz network model** to create genuine small-world properties:

1. **Ring Lattice Base**: Connect 150 `Person` nodes in a ring where each person knows their 4 nearest neighbors (high local clustering).
2. **Rewiring Phase (15%)**: Randomly disconnect 15% of lattice edges and rewire them across distant nodes (creates short average path lengths).
3. **Super-Connectors (5 Hub Nodes)**: Add 5 designated hub people who each possess 18–25 connections across different clusters.
4. **Company-Based Triangles**: Everyone working at the same company has an 80% probability of knowing each other (coworker clusters).

| Metric | Target Value |
|--------|--------------|
| Total Nodes | ~307 |
| Total Relationships | ~1,420 |
| Avg Degree (KNOWS) | 8.0 per person |
| Avg Path Length | ~3.2 hops |
| Clustering Coefficient | ~0.31 |
| Max Bounded Traversal | 5 hops |

---

## 5. Avatar Source Specification

All avatars are dynamically generated using **DiceBear Initials API**:
```javascript
const getAvatarUrl = (name) => 
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=00d2ff,6c5ce7,00b894`;
```
- Zero third-party asset hosting required.
- High visual appeal with brand color themes.
- 100% deterministic based on seed name.
