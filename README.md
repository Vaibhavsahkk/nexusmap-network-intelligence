# 🧭 NexusMap — Professional Network Intelligence

> **Live Demo**: [nexusmap.vercel.app](https://nexusmap.vercel.app) *(or local `http://localhost:3000`)*  
> **Built For**: Wexa AI Technical Assessment  
> **Tech Stack**: Next.js 15 (App Router) + CognoDB Managed Cloud Graph Database + React 19 + openCypher  

---

## 🌟 Executive Summary

**NexusMap** transforms traditional B2B contact lists and company relationships into an interactive, multi-dimensional graph context engine. Built on top of **CognoDB Cloud** (openCypher / Neo4j Bolt 5.x protocol), NexusMap answers complex contextual queries that flat relational databases struggle to execute efficiently:

- *"What is my shortest warm introduction path to the VP of Engineering at Stripe?"* (**Bounded 5-hop path traversal**)
- *"Which people in my 1st to 3rd degree network possess React & AI skills?"* (**Multi-hop pattern matching with 4-tier ranking**)
- *"Who in my network bridges FinTech and Enterprise AI industries?"* (**Degree centrality aggregation**)

---

## 🏗️ Technical Architecture & Why Graph DB?

Relational databases require expensive recursive CTEs and multiple `JOIN` operations to calculate degree separation and pathfinding. Graph databases use **index-free adjacency**, where each node physically points to its neighbors, enabling $O(1)$ traversal per hop.

```
You (Root Node) ──[:KNOWS]──> Amit Patel (1st Degree)
                                │
                          [:WORKED_AT]
                                ▼
                           Google ──[:KNOWS]──> Lisa Chen (2nd Degree)
                                                    │
                                               [:KNOWS]
                                                    ▼
                                             Stripe CTO (Target)
```

---

## ⚡ Core Features

1. **Warm Introduction Path Finder ⭐**: Native openCypher `shortestPath()` calculation bounded strictly to 5 hops (`[:KNOWS*1..5]`). Displays connection strength, relationship source, and interaction history for every step in the chain.
2. **Multi-Hop Search & 4-Tier Ranking Engine**: Traverses up to 3 degrees (`[:KNOWS*1..3]`) and ranks matching nodes using a strict 4-tier algorithm:
   $$\text{Degree (ASC)} \rightarrow \text{Mutual Count (DESC)} \rightarrow \text{Relationship Strength (DESC)} \rightarrow \text{Name (ASC)}$$
3. **Interactive WebGL Graph Canvas**: Real-time visual network navigation using `react-force-graph-2d` with dynamic node glow accents and hover tooltips.
4. **Watts-Strogatz Seed Topology**: Realistic small-world dataset containing exact **307 Nodes** and **1,420 Relationships**.
5. **Serverless Driver Protection**: Global driver singleton pattern with connection pooling (`maxConnectionPoolSize: 5`) and `disableLosslessIntegers: true` for zero memory leaks on Vercel Edge.

---

## 📁 Repository Structure

```
d:\Wexa ai/
├── docs/                      # Comprehensive Blueprint & Evaluation Specs
│   ├── ARCHITECTURE.md        # Driver pool & serverless flow
│   ├── CYPHER_QUERIES.md      # 9 openCypher reference queries
│   ├── DATA_SCHEMAS.md        # Graph schema & Watts-Strogatz specs
│   ├── PRD.md                 # User stories & 4-tier ranking logic
│   └── WHY_GRAPH_DB.md        # Mandatory SQL vs Graph essay
├── scripts/
│   ├── seed.mjs               # Graph database population script (307 nodes, 1420 edges)
│   ├── clear.mjs              # Database wipe utility
│   ├── verify.mjs             # CognoDB connection verification
│   └── test-queries.mjs       # Automated Node native test runner suite
├── src/
│   ├── app/                   # Next.js 15 App Router pages & API routes
│   │   ├── api/               # Serverless REST endpoints (search, path, person, graph, stats)
│   │   ├── path/              # Warm Path Finder UI
│   │   ├── person/[id]/       # Person Profile UI
│   │   ├── search/            # Network Search UI
│   │   └── page.jsx           # Dashboard & Force-Directed Graph Canvas
│   ├── components/            # UI components (Navbar, PersonCard, SearchBar, Graph, Path)
│   └── lib/db/                # Neo4j Driver & Cypher Query modules
└── package.json
```

---

## 🛠️ Quick Start & Setup Guide

### 1. Environment Setup
Copy `.env.example` to `.env.local` and add your CognoDB credentials:

```bash
COGNODB_URI=bolt+s://db-52b291f3.databases.cognodb.com
COGNODB_USER=cognodb
COGNODB_PASSWORD=your-cognodb-password
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Verify Database Connection
```bash
npm run verify
```

### 4. Seed CognoDB Cloud Graph
```bash
npm run seed
```

### 5. Run Automated Test Suite
```bash
npm test
```

### 6. Start Development Server
```bash
npm run dev
# Open http://localhost:3000 in your browser
```

---

## 🧪 Automated Testing Matrix (`npm test`)

The project utilizes Node.js 20's native test runner (`node --test`) to run integration tests against CognoDB Cloud:

| Test Case | Description | Result |
|-----------|-------------|--------|
| `1. Connection Check` | Driver pool connection verification | PASS |
| `2. Bounded Search Query` | 1..3 hop search & 4-tier ranking math | PASS |
| `3. Bounded Shortest Path` | 1..5 hop warm intro path discovery | PASS |
| `4. Person Profile Query` | Full node properties, work history, skills | PASS |
| `5. Graph Visualization` | Subgraph canvas node & link aggregation | PASS |
| `6. Network Analytics` | Degree centrality stats aggregation | PASS |

---

## 📄 Evaluation Artifacts

All detailed architectural documentation, Cypher query references, design systems, and evaluation essays are available in the `/docs` directory.
