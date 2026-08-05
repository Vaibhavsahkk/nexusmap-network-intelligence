# 🎨 NexusMap — UI/UX Design System

---

## 1. Design Philosophy

**"Dark, alive, and premium."**

- 🌙 **Dark mode primary** — developer/power-user aesthetic, makes neon graph edges pop
- ✨ **Glassmorphism** — frosted glass cards with blur backdrop
- 🎆 **Neon accents** — purple and cyan glow effects
- 🔄 **Micro-animations** — every interaction has feedback
- 📱 **Responsive** — mobile to 4K

---

## 2. Color Palette

```css
:root {
  /* Backgrounds */
  --bg-primary:    #0A0A1A;      /* Deep space */
  --bg-secondary:  #12122A;      /* Slightly lighter */
  --bg-card:       rgba(255, 255, 255, 0.05);  /* Glass */
  --bg-card-hover: rgba(255, 255, 255, 0.08);
  
  /* Text */
  --text-primary:   #E8E8F0;     /* Off-white */
  --text-secondary: #8888AA;     /* Muted */
  --text-muted:     #555577;     /* Very muted */
  
  /* Accents */
  --accent-purple:  #6C5CE7;     /* Primary brand */
  --accent-cyan:    #00D2FF;     /* Secondary / links */
  --accent-green:   #00B894;     /* Success */
  --accent-orange:  #FDCB6E;     /* Warning */
  --accent-red:     #FF6B6B;     /* Error / danger */
  --accent-pink:    #FD79A8;     /* Highlight */
  
  /* Graph node colors by degree */
  --node-root:      #6C5CE7;     /* You (purple) */
  --node-1st:       #00D2FF;     /* 1st degree (cyan) */
  --node-2nd:       #00B894;     /* 2nd degree (green) */
  --node-3rd:       #FDCB6E;     /* 3rd degree (yellow) */
  
  /* Glass effect */
  --glass-bg:       rgba(255, 255, 255, 0.06);
  --glass-border:   rgba(255, 255, 255, 0.1);
  --glass-blur:     12px;
  
  /* Shadows */
  --shadow-glow:    0 0 20px rgba(108, 92, 231, 0.3);
  --shadow-card:    0 8px 32px rgba(0, 0, 0, 0.4);
}
```

---

## 3. Typography

```css
/* Google Fonts: Inter + JetBrains Mono */
--font-heading: 'Inter', -apple-system, sans-serif;
--font-body:    'Inter', -apple-system, sans-serif;
--font-mono:    'JetBrains Mono', monospace;

/* Scale */
--text-xs:   0.75rem;   /* 12px — badges */
--text-sm:   0.875rem;  /* 14px — secondary text */
--text-base: 1rem;      /* 16px — body */
--text-lg:   1.125rem;  /* 18px — subtitles */
--text-xl:   1.25rem;   /* 20px — card titles */
--text-2xl:  1.5rem;    /* 24px — section titles */
--text-3xl:  2rem;      /* 32px — page titles */
--text-4xl:  2.5rem;    /* 40px — hero text */
```

---

## 4. Component Specifications

### Navbar
- Fixed top, full width, glassmorphism background
- Logo (left) + nav links (center) + GitHub (right)
- Active link: purple underline with glow
- Height: 64px

### Glass Card
```css
.card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}
.card:hover {
  background: var(--bg-card-hover);
  border-color: var(--accent-purple);
  box-shadow: var(--shadow-glow);
  transform: translateY(-2px);
}
```

### Search Bar
- Full-width input with glass background
- Search icon (left), clear button (right)
- Focus: purple glow border
- Debounce: 300ms

### Person Card
- Avatar (48px circle) + Name + Title + Company
- Degree badge (colored by degree: cyan/green/yellow)
- Mutual connections count
- Click → navigate to /person/[id]

### Stat Card
- Icon + Label + Large number
- Subtle gradient background
- Count-up animation on mount

### Path Visualization
- Horizontal chain: [You] → [Person A] → [Person B] → [Target]
- Each node: avatar circle + name below
- Each edge: animated dashed line with strength label
- Highlighted in purple/cyan glow

### Skeleton Loader
- Pulse animation (opacity: 0.3 → 0.7)
- Matches the exact shape of the component it replaces
- Person card skeleton: circle + two lines
- Stat card skeleton: rectangle

### Empty State
- Large icon (centered)
- Title: "No results found"
- Subtitle: "Try a different search query"
- Muted colors

### Error State
- Warning icon with red/orange glow
- Error message
- "Retry" button (purple)
- Helpful suggestion text

---

## 5. Page Layouts

### Dashboard (/)
```
┌──────────────────────────────────────────────┐
│  NAVBAR                                      │
├──────────────────────────────────────────────┤
│                                              │
│  Welcome back, [Name]                        │
│  Your professional network at a glance       │
│                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │Direct│ │2nd°  │ │3rd°  │ │Total │       │
│  │ 18   │ │ 95   │ │ 142  │ │ 150  │       │
│  └──────┘ └──────┘ └──────┘ └──────┘       │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │                                      │    │
│  │     INTERACTIVE NETWORK GRAPH        │    │
│  │     (force-directed, zoomable)       │    │
│  │                                      │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  TOP CONNECTORS          TOP INDUSTRIES      │
│  ┌────────────┐          ┌────────────┐      │
│  │ 1. Sarah   │          │ FinTech 22 │      │
│  │ 2. Rahul   │          │ SaaS   18  │      │
│  │ 3. Lisa    │          │ AI/ML  15  │      │
│  └────────────┘          └────────────┘      │
└──────────────────────────────────────────────┘
```

### Search (/search)
```
┌──────────────────────────────────────────────┐
│  NAVBAR                                      │
├──────────────────────────────────────────────┤
│                                              │
│  🔍 [Search your network...              ]   │
│                                              │
│  Filters: [1st°] [2nd°] [3rd°] [All]        │
│                                              │
│  Results (15 found):                         │
│  ┌────────────────────────────────────────┐  │
│  │ 👤 Priya Sharma · Senior Eng · Stripe │  │
│  │    2nd degree · 3 mutual connections   │  │
│  ├────────────────────────────────────────┤  │
│  │ 👤 Rahul Gupta · CTO · Acme Labs     │  │
│  │    1st degree · direct connection      │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

### Path Finder (/path)
```
┌──────────────────────────────────────────────┐
│  NAVBAR                                      │
├──────────────────────────────────────────────┤
│                                              │
│  Find your warm path to anyone               │
│                                              │
│  From: [You]  →  To: [Search person...   ]   │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  │  [You] ──8──> [Amit] ──5──> [Target]  │  │
│  │   👤          👤           👤         │  │
│  │   Founder     VP Eng       CTO        │  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Path Details:                               │
│  Hop 1: You → Amit (strength 8, via work)    │
│  Hop 2: Amit → Target (strength 5, linkedin) │
└──────────────────────────────────────────────┘
```

---

## 6. Animation Specifications

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Card hover | Scale up + glow | 300ms | ease-out |
| Page transition | Fade in | 200ms | ease |
| Skeleton pulse | Opacity loop | 1.5s | ease-in-out |
| Stat number | Count up | 800ms | ease-out |
| Graph nodes | Spring physics | continuous | force simulation |
| Path highlight | Glow pulse | 2s | ease-in-out infinite |
| Search results | Stagger fade in | 50ms per item | ease |
| Navbar scroll | Blur backdrop | 200ms | ease |

---

## 7. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| Mobile | < 768px | Stack cards, hide graph, hamburger nav |
| Tablet | 768-1024px | 2-column grid, compact graph |
| Desktop | 1024-1440px | Full layout |
| Wide | > 1440px | Max-width container, centered |
