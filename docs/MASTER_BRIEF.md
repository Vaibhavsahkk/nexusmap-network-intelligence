# 🧭 NexusMap Master Brief & Strategic Alignment

> **Project Name**: NexusMap  
> **Tagline**: Professional Network Intelligence Powered by Graph Context  
> **Target Platform**: Next.js 15 + CognoDB Cloud  
> **Target Architecture**: Commercial Graph SaaS Platform  

---

## 1. Executive Summary

NexusMap is a **Professional Network Intelligence Platform** built on top of CognoDB managed graph database. It transforms flat contact lists and company relationships into an interactive, multi-dimensional graph.

Unlike traditional CRUD social networks, NexusMap answers complex contextual questions that relational databases struggle to execute:
- *"What is my shortest warm introduction path to the VP of Engineering at Stripe?"* (Bounded 5-hop path traversal)
- *"Who in my network bridges the FinTech and AI/ML industries?"* (Degree centrality & pattern matching)
- *"Which people in my 1st to 3rd degree network possess senior React skills?"* (Multi-hop pattern matching)

---

## 2. Product Mission & Value Proposition

NexusMap builds a **Context Governance Platform** that connects professional relationships, companies, and skills into a unified knowledge graph:

1. **Context over Records**: A person isn't just a row in a SQL database; they are defined by their position in a graph (connections, shared history, skills, companies).
2. **Graph-Native Queries**: Leverages openCypher for multi-hop graph traversals (`1..3` hops for search, `1..5` hops for shortest path) that are awkward and slow in SQL.
3. **Enterprise Relevance**: Mirrors real B2B sales development, talent acquisition, and executive networking workflows.

---

## 3. Product Features & Core Value

| Feature | Description | Graph Advantage |
|---------|-------------|-----------------|
| **Warm Path Finder** | Finds shortest connection chain from the seeded root user to any person (max 5 hops) | Native `shortestPath()` algorithm in openCypher |
| **Network Search** | Multi-hop search ranked by degree, mutual connections, & strength | 3-hop traversal (`[:KNOWS*1..3]`) with pattern matching |
| **Interactive Graph Canvas** | WebGL force-directed visualization of 307 nodes & 1,420 relationships | Real-time visual network navigation |
| **Company Explorer** | Maps internal company employees to reachable network paths | Dual-node relationship matching (`Person` + `Company`) |
| **Network Analytics** | Identifies super-connectors and top industry hubs | Degree centrality aggregation |

---

## 4. Key Differentiators

1. **Not a generic social network clone**: Focuses on **intelligence and path discovery**, not post feeds or messaging.
2. **Deterministic Watts-Strogatz topology**: Realistic small-world dataset (307 nodes, 1,420 edges) with genuine clustering and hub nodes.
3. **Production-hardened Next.js 15 architecture**: Global driver pool caching for serverless environments, React Server Components, and zero memory leaks.
4. **Native Automated Testing**: Automated test suite (`scripts/test-queries.mjs`) using Node's native test runner (`node --test`).

---

## 5. Seed Data Specifications (Locked)

- **Total Nodes**: Exact 307 (150 People, 40 Companies, 50 Skills, 20 Universities, 15 Locations, 12 Industries, 20 Events)
- **Total Relationships**: Exact 1,420 (600 KNOWS, 200 WORKED_AT, 300 HAS_SKILL, 100 STUDIED_AT, 100 LOCATED_IN, 40 IN_INDUSTRY, 80 ATTENDED)
- **Depth Constraints**: Search bounded to 3 hops (`1..3`); Shortest path bounded to 5 hops (`1..5`).
- **Root User Contract**: Seed exactly one root person with `id = "root-user-id"` and `isRoot = true`; all warm-path queries default to that node.
