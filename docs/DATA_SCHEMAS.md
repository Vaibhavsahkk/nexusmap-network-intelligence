# 📊 NexusMap — Graph Data Schemas & Watts-Strogatz Seed Topology

> **Database**: CognoDB Managed Cloud Graph Database  
> **Protocol**: Bolt 5.x (openCypher / Neo4j driver)  
> **Seed Volume**: Exact **307 Nodes** & **1,420 Relationships**  

---

## 🎨 Graph Data Model Diagram (openCypher)

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

## 1. Node Labels & Properties

### 1.1 `Person` (150 Nodes)
- `id` (string, unique): e.g., `"root-user-id"`, `"person-1"`
- `name` (string): e.g., `"Priya Sharma"`
- `title` (string): e.g., `"Senior Engineer at Stripe"`
- `email` (string): e.g., `"priya@example.com"`
- `bio` (string): Short biography
- `avatarUrl` (string): DiceBear SVG URL
- `linkedinUrl` (string): LinkedIn profile URL
- `twitterHandle` (string): Twitter handle
- `isRoot` (boolean): `true` for root user (`"root-user-id"`)

### 1.2 `Company` (40 Nodes)
- `id` (string, unique): e.g., `"comp-1"`
- `name` (string): e.g., `"Stripe"`, `"Google"`, `"Wexa AI"`
- `domain` (string): e.g., `"stripe.com"`
- `size` (string): e.g., `"1000+"`
- `founded` (integer): e.g., `2010`

### 1.3 `Skill` (50 Nodes)
- `id` (string, unique): e.g., `"skill-1"`
- `name` (string): e.g., `"React"`, `"Cypher"`, `"System Architecture"`
- `category` (string): e.g., `"Engineering"`, `"Product"`

### 1.4 `University` (20 Nodes)
- `id` (string, unique): e.g., `"univ-1"`
- `name` (string): e.g., `"IIT Delhi"`, `"BITS Pilani"`, `"Stanford University"`

### 1.5 `Location` (15 Nodes)
- `id` (string, unique): e.g., `"loc-1"`
- `city` (string): e.g., `"San Francisco"`
- `country` (string): e.g., `"USA"`

### 1.6 `Industry` (12 Nodes)
- `id` (string, unique): e.g., `"ind-1"`
- `name` (string): e.g., `"Artificial Intelligence"`, `"FinTech"`

### 1.7 `Event` (20 Nodes)
- `id` (string, unique): e.g., `"event-1"`
- `name` (string): e.g., `"Tech Summit 2024"`

---

## 2. Relationship Types & Properties (1,420 Edges)

- `(:Person)-[:KNOWS {strength: 1-10, since: "YYYY-MM", source: "work|event|university"}]->(:Person)` (600 Edges)
- `(:Person)-[:WORKED_AT {role: string, isCurrent: boolean}]->(:Company)` (200 Edges)
- `(:Person)-[:HAS_SKILL {proficiency: "expert|advanced"}]->(:Skill)` (300 Edges)
- `(:Person)-[:STUDIED_AT {degree: string, field: string}]->(:University)` (100 Edges)
- `(:Person)-[:LOCATED_IN]->(:Location)` (100 Edges)
- `(:Company)-[:IN_INDUSTRY]->(:Industry)` (40 Edges)
- `(:Person)-[:ATTENDED]->(:Event)` (80 Edges)
