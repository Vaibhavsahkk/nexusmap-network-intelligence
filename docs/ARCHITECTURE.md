# 🏗️ NexusMap — System Architecture

> **Version**: 1.1 (Production & Serverless Hardened)  
> **Pattern**: Monolithic Next.js 15 with API Routes + CognoDB Cloud  

---

## 1. High-Level Architecture

```
┌────────────────────────────────────────────────────────────┐
│                       VERCEL EDGE                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Next.js 15 App                     │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │  │
│  │  │   Pages/    │  │ Components/ │  │   Hooks/    │  │  │
│  │  │  Dashboard  │  │  GraphViz*  │  │ useSearch   │  │  │
│  │  │  Search     │  │  PathViz*   │  │ usePath     │  │  │
│  │  │  PathFinder │  │  Profile    │  │ useGraph    │  │  │
│  │  │  Person     │  │  Cards      │  │ useProfile  │  │  │
│  │  │  Company    │  │  SearchBar* │  │ useCompany  │  │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │  │
│  │                   (* 'use client' Directive)        │  │
│  │                                                      │  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │              API Routes Layer                │    │  │
│  │  │  /api/search     /api/path     /api/person   │    │  │
│  │  │  /api/company    /api/graph    /api/stats    │    │  │
│  │  │  /api/health                                 │    │  │
│  │  └──────────────────┬───────────────────────────┘    │  │
│  │                     │                                │  │
│  │  ┌──────────────────▼───────────────────────────┐    │  │
│  │  │      Database Layer (lib/db/driver.js)       │    │  │
│  │  │  ┌─────────────┐  ┌───────────────────────┐  │    │  │
│  │  │  │ Global Scope│  │  queries/*.js         │  │    │  │
│  │  │  │ Driver Pool │  │  Parameterised Cypher │  │    │  │
│  │  │  │ (Max Pool 5)│  │  Bounded 1..5 Hops    │  │    │  │
│  │  │  └──────┬──────┘  └───────────────────────┘  │    │  │
│  │  └─────────┼────────────────────────────────────┘    │  │
│  └────────────┼─────────────────────────────────────────┘  │
└───────────────┼────────────────────────────────────────────┘
                │ Bolt 5.x (bolt+s://)
                │ Encrypted TLS (Timeout: 5000ms)
                ▼
┌────────────────────────────────────────────────────────────┐
│                    CognoDB Cloud                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Free Tier Instance (c0)                 │  │
│  │  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │  │
│  │  │  Nodes   │  │   Edges   │  │    Indexes       │  │  │
│  │  │  ~307    │  │   ~1420   │  │  Person.name     │  │  │
│  │  │          │  │           │  │  Company.name     │  │  │
│  │  │          │  │           │  │  Person.id        │  │  │
│  │  └──────────┘  └───────────┘  └──────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

---

## 2. Serverless Connection Management (Resolving Driver Leaks)

Vercel Serverless functions freeze between invocations and instantiate fresh containers on cold starts. Standard driver initializations leak connections and quickly exhaust CognoDB's free tier pool (max 200).

```javascript
// src/lib/db/driver.js — Global Scope Cache for Serverless
import neo4j from 'neo4j-driver';

const globalForNeo4j = globalThis;

export function getDriver() {
  if (!globalForNeo4j.__neo4jDriver) {
    const uri = process.env.COGNODB_URI;
    const password = process.env.COGNODB_PASSWORD;

    if (!uri || !password) {
      throw new Error('Missing database credentials in environment variables');
    }

    globalForNeo4j.__neo4jDriver = neo4j.driver(
      uri,
      neo4j.auth.basic('cognodb', password),
      {
        maxConnectionPoolSize: 5,            // Kept low for serverless concurrency
        connectionAcquisitionTimeout: 3000,   // Fail fast if pool exhausted
        connectionTimeout: 5000,              // Prevent hanging requests (Vercel 10s limit)
        maxTransactionRetryTime: 3000,
        disableLosslessIntegers: true,       // Auto-converts Neo4j Integers to JS primitives (prevents JSON serialization bugs)
      }
    );
  }
  return globalForNeo4j.__neo4jDriver;
}

export async function executeQuery(cypher, params = {}) {
  const driver = getDriver();
  const session = driver.session();
  try {
    const result = await session.run(cypher, params);
    return result.records;
  } finally {
    await session.close(); // ALWAYS close session immediately
  }
}
```

---

## 3. Server Components vs Client Components Strategy

Next.js 15 defaults to React Server Components (RSC). Interactive UI elements (Canvas, hooks, state) require strict separation:

### Server Components (Default)
- `app/page.jsx`, `app/search/page.jsx`, `app/path/page.jsx`, etc.
- Page layouts, initial metadata, static structure.

### Client Components (Explicit `'use client'`)
- `NetworkGraph.jsx` — Uses Canvas/WebGL rendering. Loaded via Next.js dynamic import:
  ```javascript
  import dynamic from 'next/dynamic';
  const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });
  ```
- `SearchBar.jsx` — Input state, debouncing, keyboard handlers.
- `PathDisplay.jsx` — Animated step highlights.
- `ErrorBoundary.jsx` — React error boundaries.

---

## 4. Timeout & Performance Constraints

- **Vercel Serverless Function Limit**: 10 Seconds max duration.
- **API Timeout Guard**: Every API route exports explicit max duration:
  ```javascript
  export const maxDuration = 10;
  ```
- **Cypher Traversal Limit**: Bounded strictly to `1..5` hops (`[:KNOWS*1..5]`) across all queries.

---

## 5. Indexing Strategy

```cypher
CREATE INDEX person_id FOR (p:Person) ON (p.id);
CREATE INDEX person_name FOR (p:Person) ON (p.name);
CREATE INDEX company_name FOR (c:Company) ON (c.name);
CREATE INDEX company_id FOR (c:Company) ON (c.id);
CREATE INDEX skill_name FOR (s:Skill) ON (s.name);
```

---

## 6. Environment Configuration

```bash
# .env.local (NEVER committed to git)
COGNODB_URI=bolt+s://<instance-id>.databases.cognodb.cloud
COGNODB_USER=cognodb
COGNODB_PASSWORD=<generated-password>

# Optional
NEXT_PUBLIC_APP_URL=https://nexusmap.vercel.app
NODE_ENV=production
```
