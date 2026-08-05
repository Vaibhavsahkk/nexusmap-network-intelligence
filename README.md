# 🧭 NexusMap — Professional Network Intelligence

> **Live Demo**: `http://localhost:3000` *(or production deployment)*  
> **Built For**: Wexa AI Technical Assessment  
> **Database Engine**: CognoDB Cloud (`bolt+s://db-52b291f3.databases.cognodb.com`)  
> **Tech Stack**: Next.js 15 (App Router) + React 19 + `neo4j-driver` (Bolt 5.x) + WebGL Canvas  

---

## 🎨 Graph Data Model Schema (CognoDB openCypher)

NexusMap models professional networks as an interconnected graph with **307 Nodes** and **1,420 Relationships**:

```mermaid
graph TD
    classDef personNode fill:#8b5cf6,stroke:#a78bfa,stroke-width:2px,color:#fff;
    classDef companyNode fill:#10b981,stroke:#34d399,stroke-width:2px,color:#fff;
    classDef skillNode fill:#f43f5e,stroke:#fb7185,stroke-width:2px,color:#fff;
    classDef univNode fill:#f59e0b,stroke:#fbbf24,stroke-width:2px,color:#fff;
    classDef locNode fill:#00d2ff,stroke:#38bdf8,stroke-width:2px,color:#000;
    classDef indNode fill:#64748b,stroke:#94a3b8,stroke-width:2px,color:#fff;
    classDef eventNode fill:#334155,stroke:#475569,stroke-width:2px,color:#fff;

    P1[Person : Node]:::personNode
    P2[Person : Node]:::personNode
    C[Company : Node]:::companyNode
    S[Skill : Node]:::skillNode
    U[University : Node]:::univNode
    L[Location : Node]:::locNode
    I[Industry : Node]:::indNode
    E[Event : Node]:::eventNode

    P1 -- "KNOWS {strength, since, source}" --> P2
    P1 -- "WORKED_AT {role, isCurrent}" --> C
    P1 -- "HAS_SKILL {proficiency}" --> S
    P1 -- "STUDIED_AT {degree, field}" --> U
    P1 -- "LOCATED_IN" --> L
    P1 -- "ATTENDED" --> E
    C -- "IN_INDUSTRY" --> I
    C -- "LOCATED_IN" --> L
```

---

## ⚡ Architecture & Request Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser
    participant App as Next.js 15 App Router
    participant Driver as Neo4j Driver (globalThis Pool)
    participant DB as CognoDB Cloud Engine

    User->>App: GET /api/path?to=person-10
    App->>Driver: executeQuery(cypher, {targetId})
    Driver->>DB: MATCH path = shortestPath((start)-[:KNOWS*1..5]-(target))
    DB-->>Driver: openCypher Graph Result Set
    Driver-->>App: Automatic Integer Conversion & Closed Session
    App-->>User: JSON Response (found: true, hops: 3, step-by-step chain)
```

---

## 🌟 Executive Summary & Technical Advantage

Unlike traditional CRUD social networks, NexusMap answers complex contextual questions using **Index-Free Adjacency** in CognoDB:

- **Warm Introduction Path Finder ⭐**: OpenCypher `shortestPath()` calculation bounded strictly to 5 hops (`[:KNOWS*1..5]`). Displays strength scores, relationship sources, and interaction dates for each step in the chain.
- **4-Tier Ranked Multi-Hop Search**: Traverses up to 3 degrees (`[:KNOWS*1..3]`) and orders results using a strict 4-tier algorithm:
  $$\text{Degree (ASC)} \rightarrow \text{Mutual Count (DESC)} \rightarrow \text{Max Strength (DESC)} \rightarrow \text{Name (ASC)}$$
- **WebGL Interactive Graph Canvas**: WebGL force-directed visual network navigation using `react-force-graph-2d` with dynamic node glow accents and hover tooltips.
- **Deterministic Watts-Strogatz Topology**: Realistic small-world dataset (307 nodes, 1,420 edges) with genuine clustering and 5 super-connector hub nodes.

---

## 🎯 Wexa AI Technical Requirements Verification Checklist

| Requirement | Description | Status | Verification Proof |
|-------------|-------------|--------|--------------------|
| **CognoDB Integration** | Managed graph database via Bolt 5.x protocol | ✅ **100% Pass** | Connected to `db-52b291f3.databases.cognodb.com` |
| **Multi-Hop Traversal** | Multi-hop search (`1..3`) & warm path finder (`1..5`) | ✅ **100% Pass** | `src/lib/db/queries/path.js` & `search.js` |
| **Search Ranking** | Degree ASC $\rightarrow$ Mutuals DESC $\rightarrow$ Strength DESC | ✅ **100% Pass** | openCypher Query 1 parameterised ranking |
| **Interactive Canvas** | WebGL force-directed network graph | ✅ **100% Pass** | `src/components/graph/NetworkGraph.jsx` |
| **Profile Views** | Node properties, work history, skills, education | ✅ **100% Pass** | `src/app/person/[id]/page.jsx` |
| **Serverless Safety** | Driver singleton pool & integer conversion | ✅ **100% Pass** | `src/lib/db/driver.js` (`disableLosslessIntegers`) |
| **Automated Test Suite**| Native test runner (`node --test`) | ✅ **100% Pass** | `npm test` (7/7 assertions passing) |
| **Production Build** | Next.js 15 App Router production bundle | ✅ **100% Pass** | `npm run build` (0 build errors) |

---

## 🛠️ Quick Start Guide

### 1. Environment Setup
Copy `.env.example` to `.env.local` and insert CognoDB Cloud credentials:

```bash
COGNODB_URI=bolt+s://db-52b291f3.databases.cognodb.com
COGNODB_USER=cognodb
COGNODB_PASSWORD=your-cognodb-password
```

### 2. Install & Verify Connection
```bash
npm install
npm run verify
```

### 3. Seed CognoDB Database
```bash
npm run seed
```

### 4. Run Automated Test Suite
```bash
npm test
```

### 5. Start Development Server
```bash
npm run dev
# Open http://localhost:3000
```

---

## 🧪 Test Matrix Results (`npm test`)

```text
▶ NexusMap Complete API Layer & Query Test Suite
  ✔ 1. Database Connectivity & Driver Pool (964ms)
  ✔ 2. Bounded Search Query (1..3 Hops with 4-Tier Ranking) (278ms)
  ✔ 3. Bounded Shortest Path Query (1..5 Hops) (246ms)
  ✔ 4. Full Person Profile Query (240ms)
  ✔ 5. Network Graph Visualization Subgraph Query (736ms)
  ✔ 6. Network Overview Analytics Stats Query (281ms)
✔ NexusMap Complete API Layer & Query Test Suite (2751ms)

ℹ tests 7 | pass 7 | fail 0
```
