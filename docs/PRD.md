# 📋 NexusMap — Product Requirements Document (PRD)

> **Status**: Final & Locked  
> **Version**: 1.2  
> **Last Updated**: August 2026  

---

## 1. Product Overview

**NexusMap** is a web application that visualizes professional networks as an interactive graph, enabling users to discover warm introduction paths, explore company connections, and understand the hidden structure of their professional relationships.

**Backend**: CognoDB (managed graph database, openCypher, Bolt 5.x)  
**Frontend**: Next.js 15 with React 19  
**Deployment**: Vercel Edge Network  

---

## 2. User Stories

### P0 — Must Have (Assignment Requirements)

| ID | Story | Acceptance Criteria |
|----|-------|-------------------|
| US-01 | As a user, I want to **search for people** in my network by name, company, or skill | Search returns results within 3 hops (`1..3`), ranked by degree, mutual count, and relationship strength |
| US-02 | As a user, I want to **find the warmest path** from me to any person | Visual path display showing each hop (max 5 hops) with relationship strength & source |
| US-03 | As a user, I want to **view a person's profile** with career, skills, and mutual connections | Profile page with all related graph data & connection degree |
| US-04 | As a user, I want to **explore my network visually** as an interactive graph | Force-directed graph canvas (307 nodes, 1,420 edges), clickable nodes, hover tooltips |
| US-05 | As a user, I want to **see loading states** while data is being fetched | Pulse skeleton loaders on every data-dependent component |
| US-06 | As a user, I want to **see meaningful empty states** when no results are found | Friendly message + suggested actions |
| US-07 | As a user, I want the app to **handle errors gracefully** when database is down | Error boundary with retry button (503 status) |
| US-08 | As a developer/evaluator, I want **automated tests** verifying Cypher queries | `npm test` runs Node test runner against database logic |

---

## 3. Functional Requirements

### 3.1 Search Engine & Full Ranking Specification

```
INPUT:  Free-text query (name, company, skill, title)
OUTPUT: List of matching persons within 3 hops (`1..3`), ranked explicitly by:
        1. Connection degree ASC (1st > 2nd > 3rd)
        2. Mutual connection count DESC
        3. Maximum relationship strength DESC (10 > 1)
        4. Person name ASC
```

### 3.2 Warm Path Finder

```
INPUT:  Target person ID + Optional Source person ID (defaults to root user)
OUTPUT: Shortest path from source to target (bounded strictly to 5 hops)
        Each hop shows: person name, relationship type, strength score, and source
```

The default source person is the seeded root user with `id = "root-user-id"` and `isRoot = true`.

**Behavior**:
- Maximum depth: 5 hops (`:KNOWS*1..5`)
- Visual: animated path on the graph canvas
- If no path: "No connection path found within 5 degrees"

---

## 4. Locked Seed Data Specifications

### Exact Volume (Within CognoDB Free Tier)
- **People**: 150 nodes
- **Companies**: 40 nodes
- **Skills**: 50 nodes
- **Universities**: 20 nodes
- **Locations**: 15 nodes
- **Industries**: 12 nodes
- **Events**: 20 nodes
- **KNOWS relationships**: 600 edges
- **WORKED_AT relationships**: 200 edges
- **HAS_SKILL relationships**: 300 edges
- **STUDIED_AT relationships**: 100 edges
- **LOCATED_IN relationships**: 100 edges
- **IN_INDUSTRY relationships**: 40 edges
- **ATTENDED relationships**: 80 edges

**Total**: Exact **307 nodes** and **1,420 relationships** (~8MB disk usage).
