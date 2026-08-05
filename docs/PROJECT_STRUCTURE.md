# 📁 NexusMap — Project Structure & Config Files

```
nexusmap/
├── .env.example                    # Template (committed)
├── .env.local                      # Actual secrets (NEVER committed)
├── .gitignore                      # Excludes .env.local, node_modules, .next
├── next.config.mjs                 # Next.js configuration
├── package.json                    # Dependencies and scripts
├── jsconfig.json                   # Path aliases (@/lib, @/components)
├── README.md                       # Full project documentation
│
├── scripts/                        # Data management scripts
│   ├── seed.mjs                    # Main Watts-Strogatz seed script
│   ├── clear.mjs                   # Clears all data from CognoDB
│   └── verify.mjs                  # Verifies CognoDB connection
│
├── src/
│   ├── app/                        # Next.js App Router (RSC)
│   │   ├── layout.jsx              # Root layout
│   │   ├── globals.css             # Design tokens & glassmorphism
│   │   ├── page.jsx                # / — Dashboard
│   │   ├── search/page.jsx         # /search — Network search
│   │   ├── path/page.jsx           # /path — Warm path finder
│   │   ├── person/[id]/page.jsx    # /person/:id — Person profile
│   │   └── api/                    # 7 Serverless REST routes
│   │       ├── search/route.js
│   │       ├── path/route.js
│   │       ├── person/[id]/route.js
│   │       ├── company/[id]/route.js
│   │       ├── graph/route.js
│   │       ├── stats/route.js
│   │       └── health/route.js
│   │
│   ├── components/                 # UI components
│   │   ├── graph/
│   │   │   └── NetworkGraph.jsx    # 'use client' + Dynamic Import
│   │   ├── search/
│   │   │   └── SearchBar.jsx       # 'use client'
│   │   ├── path/
│   │   │   └── PathDisplay.jsx     # 'use client'
│   │   └── ui/                     # Cards, Skeletons, ErrorBoundary
│   │
│   └── lib/                        # Shared DB layer & utilities
│       ├── db/
│       │   ├── driver.js           # Serverless global singleton driver
│       │   └── queries/            # Parameterised openCypher queries
│       └── utils.js
```

---

## 🛠️ Complete Configuration File Specifications

### 1. `package.json`
```json
{
  "name": "nexusmap",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "seed": "node scripts/seed.mjs",
    "clear": "node scripts/clear.mjs",
    "verify": "node scripts/verify.mjs",
    "test": "node --test scripts/test-queries.mjs"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "neo4j-driver": "^5.27.0",
    "react-force-graph-2d": "^1.26.0",
    "lucide-react": "^0.460.0"
  },
  "devDependencies": {
    "@faker-js/faker": "^9.0.0"
  }
}
```

### 2. `.gitignore`
```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env.local
```

### 3. `jsconfig.json`
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 4. `next.config.mjs`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
};

export default nextConfig;
```
