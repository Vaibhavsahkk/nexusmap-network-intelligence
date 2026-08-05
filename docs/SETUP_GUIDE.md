# 🚀 NexusMap — Setup Guide

> From zero to running in under 10 minutes (Windows, Mac & Linux compatible).

---

## Prerequisites

- **Node.js** 18+ (recommended: 20 LTS)
- **npm** 9+ (comes with Node.js)
- **Git** (any recent version)
- **CognoDB Cloud account** (free, no credit card required)

---

## Step 1: Create CognoDB Cloud Instance

1. Go to [console.cognodb.com/signup](https://console.cognodb.com/signup)
2. Sign up (free tier, no credit card required)
3. Click **"Create Instance"** → select **Free (c0)** → pick a region
4. Wait ~60 seconds for provisioning
5. **IMMEDIATELY** copy:
   - Connection URI: `bolt+s://<instance-id>.databases.cognodb.cloud`
   - Password (shown only once)
   - Username: `cognodb` (default)

---

## Step 2: Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/nexusmap.git
cd nexusmap
npm install
```

---

## Step 3: Configure Environment (Windows & Cross-Platform Safe)

```powershell
# Windows (PowerShell)
Copy-Item .env.example .env.local

# Mac / Linux (Bash)
cp .env.example .env.local
```

Edit **`.env.local`** with your credentials:
```env
COGNODB_URI=bolt+s://your-instance-id.databases.cognodb.cloud
COGNODB_USER=cognodb
COGNODB_PASSWORD=your-generated-password
```

> ⚠️ **NEVER commit `.env.local` to git.** It is ignored by `.gitignore`.

---

## Step 4: Verify Database Connection

```bash
npm run verify
```

Expected output:
```
✅ Connected to CognoDB successfully
   Instance: bolt+s://xxx.databases.cognodb.cloud
   Status: Ready
```

---

## Step 5: Seed the Database

```bash
npm run seed
```

Expected output:
```
🌱 Seeding NexusMap database...
   Generating small-world lattice (Watts-Strogatz algorithm)...
   Creating 150 people (with DiceBear avatars)... ✅
   Creating 40 companies...                       ✅
   Creating 50 skills...                          ✅
   Creating 600 KNOWS edges (undirected rule)...  ✅
   Creating indexes...                            ✅
🎉 Seeded 307 nodes and 1420 relationships in ~8s
```

The seed script must also create one deterministic root person with `id = "root-user-id"` and `isRoot = true`; the path finder and profile queries default to that node when `from` is omitted.

---

## Step 6: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
