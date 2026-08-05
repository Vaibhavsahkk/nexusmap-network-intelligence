# 🌐 NexusMap — API Reference & Contract

> All endpoints, parameters, responses, and error codes strictly aligned with UX & Cypher query signatures.

---

## Base URL
- **Local**: `http://localhost:3000/api`
- **Production**: `https://nexusmap.vercel.app/api`

---

## GET /api/health

Check database connectivity.

**Response 200**:
```json
{ "status": "healthy", "database": "connected", "timestamp": "2026-08-05T12:00:00Z" }
```
**Response 503**:
```json
{ "status": "unhealthy", "database": "disconnected", "error": "ServiceUnavailable" }
```

---

## GET /api/search

Search for people in the network (max 3 hops, 4-tier ranked).

| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `q` | string | ✅ | — | Search query (name, title, company, skill) |
| `degree` | integer | ❌ | 3 | Max degrees of separation (1-3) |
| `limit` | integer | ❌ | 20 | Max results (1-50) |

**Response 200**:
```json
{
  "data": [
    {
      "id": "uuid-123",
      "name": "Priya Sharma",
      "title": "Senior Engineer at Stripe",
      "avatar": "https://api.dicebear.com/9.x/initials/svg?seed=Priya%20Sharma",
      "degree": 2,
      "mutualCount": 3,
      "maxStrength": 8
    }
  ],
  "total": 15,
  "query": "Priya"
}
```

---

## GET /api/path

Find shortest warm path between two people (max 5 hops).

| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `to` | string | ✅ | — | Target person UUID |
| `from` | string | ❌ | `root-user-id` | Source person UUID (defaults to the seeded root user with id `root-user-id`) |

**Response 200**:
```json
{
  "data": {
    "found": true,
    "hops": 3,
    "people": [
      { "id": "root-1", "name": "You", "title": "Founder", "avatar": "..." },
      { "id": "uuid-2", "name": "Amit Patel", "title": "VP Eng", "avatar": "..." },
      { "id": "uuid-3", "name": "Lisa Chen", "title": "Director", "avatar": "..." },
      { "id": "uuid-4", "name": "Target Person", "title": "CTO", "avatar": "..." }
    ],
    "connections": [
      { "strength": 8, "since": "2020-03", "source": "work" },
      { "strength": 5, "since": "2022-11", "source": "linkedin" },
      { "strength": 3, "since": "2023-06", "source": "event" }
    ]
  }
}
```

**Response 404**: `{ "data": { "found": false, "message": "No connection path found within 5 degrees" } }`

---

## GET /api/person/[id]

Get full profile of a person.

**Response 200**:
```json
{
  "data": {
    "person": {
      "id": "uuid-123", "name": "Priya Sharma", "title": "Senior Engineer",
      "email": "priya@example.com", "bio": "...", "avatar": "..."
    },
    "workHistory": [
      { "company": "Stripe", "role": "Senior Engineer", "current": true, "start": "2022-01" }
    ],
    "skills": [
      { "name": "React", "category": "Frontend", "proficiency": "expert" }
    ],
    "education": [
      { "university": "IIT Delhi", "degree": "B.Tech", "field": "CS" }
    ],
    "location": "San Francisco, USA",
    "connectionDegree": 2
  }
}
```

---

## GET /api/graph

Get network data for graph visualization.

**Response 200**:
```json
{
  "data": {
    "nodes": [
      { "id": "uuid-1", "name": "You", "title": "Founder", "avatar": "..." }
    ],
    "edges": [
      { "source": "uuid-1", "target": "uuid-2", "strength": 8 }
    ]
  }
}
```

---

## GET /api/stats

Get network analytics.

**Response 200**:
```json
{
  "data": {
    "directCount": 18,
    "reach2Hops": 95,
    "totalReachable": 142
  }
}
```

---

## 📌 Next.js 15 Developer Guidelines

1. **Async Route Params**: Next.js 15 requires awaiting dynamic route params: `const { id } = await params;`.
2. **Dynamic Server Routes**: All data-fetching API routes specify `export const dynamic = 'force-dynamic'`.
