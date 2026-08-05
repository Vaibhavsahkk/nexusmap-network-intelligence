# 📝 NexusMap — Implementation Tasks & Automated Test Plan

> Bounded 44-hour execution blueprint with cross-platform npm scripts and automated tests.

---

## ⏱️ Phased Task Roadmap

| Phase | Core Deliverables | Est. Time | Priority |
|-------|------------------|-----------|----------|
| **1. Foundation** | Setup, Driver, Watts-Strogatz Seed Script | 6h | P0 |
| **2. API Layer** | 7 REST API endpoints + Cypher query functions | 6h | P0 |
| **3. Automated Tests** | Write & execute `scripts/test-queries.mjs` (`npm test`) | 2h | P0 |
| **4. UI Components** | Navbar, Cards, SearchBar, GraphViz, PathViz | 8h | P0 |
| **5. Core Pages** | Dashboard (`/`), Search (`/search`), Path Finder (`/path`), Profile | 10h | P0 |
| **6. Polish & Deploy**| Glassmorphism, Vercel Edge deploy, README & recording | 7h | P0 |
| **7. Buffer** | Final testing & buffer | 5h | Buffer |

---

## 🧪 Cross-Platform Automated & Manual Verification

### 1. Automated Test Suite (`npm test`)

```bash
npm test
```
Runs Node's native test runner (`node --test scripts/test-queries.mjs`) to assert:
- CognoDB connection stability
- Bounded search (`1..3` hops) and 4-tier ranking math
- Shortest warm path (`1..5` hops) discovery
- Parameterized query sanitization

### 2. Manual API Smoke Tests

```bash
# Health Check
curl http://localhost:3000/api/health

# Bounded Search with Ranking
curl "http://localhost:3000/api/search?q=Priya&limit=5"

# Shortest Path Discovery
curl "http://localhost:3000/api/path?to=<target-id>"
```
