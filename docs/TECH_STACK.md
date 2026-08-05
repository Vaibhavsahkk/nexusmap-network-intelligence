# 🛠️ NexusMap — Technology Stack

> Every choice justified. Zero bloat. 100% cross-platform.

---

## Core Stack Summary

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| **Runtime** | Node.js | 20 LTS | Stable, Vercel & Windows native |
| **Framework** | Next.js | 15.x | SSR, API routes, App Router, Vercel-native |
| **UI Library** | React | 19.x | Component model, ecosystem |
| **Language** | JavaScript (ES2024) | — | Standard JS module (`"type": "module"`) |
| **Database** | CognoDB Cloud | Free (c0) | Managed openCypher graph database |
| **DB Driver** | neo4j-driver | 5.x | Official Neo4j driver with `disableLosslessIntegers: true` |
| **Graph Viz** | react-force-graph-2d | 1.x | WebGL force-directed graph canvas (dynamic import) |
| **Styling** | Vanilla CSS (CSS Modules) | — | Full control over dark theme & glassmorphism |
| **Icons** | Lucide React | 0.4x | Lightweight icon set |
| **Seed Data** | @faker-js/faker | 9.x | Deterministic Watts-Strogatz network generator |
| **Avatars** | DiceBear Initials API | 9.x | Dynamic SVG avatar generation |
| **Automated Testing**| Node.js Native Test Runner | `node --test` | Built-in test runner, zero extra dependencies |
| **Hosting** | Vercel Edge Network | Free tier | Native Next.js hosting |

---

## Automated Testing Strategy (`node --test`)

Rather than adding heavy testing frameworks like Jest or Vitest, NexusMap uses Node.js 20's **native test runner** (`node --test`).

```bash
# Run automated query & driver integration tests
npm test
```

Test suite (`scripts/test-queries.mjs`) verifies:
1. Driver connection & credentials initialization
2. Bounded search query execution & 4-tier ranking output
3. Bounded shortest path discovery (`1..5` hops)
4. Parameterized input safety (SQL/Cypher injection prevention)
