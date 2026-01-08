# Monostich - Project Context

**Last Updated:** December 27, 2025
**Status:** Initial setup complete ✅ | Building features (Week 1)
**Target Ship Date:** February 25, 2026
**Live URL:** [your-vercel-url]

---

## Project Overview

**What:** A web app inspired by magnetic poetry kits. Users arrange word tiles from a curated set to create poems, save them, and share with others.

**Why:** Portfolio project demonstrating full-stack skills, Next.js proficiency, and data thinking. Part of career transition from bootcamp → stable dev role.

**Core Constraint:** Fixed word set (like magnetic poetry) - this naturally limits scope and enables interesting analytics later.

---

## Current Status

### ✅ Completed (Setup - Dec 27, 2025)

**Infrastructure:**
- Next.js 16.1.1 with TypeScript, Tailwind v4, ESLint
- Supabase local development environment
- Supabase cloud production database
- Deployed to Vercel (production-ready)
- Git repository with initial commits

**Database:**
- Schema created: `words` and `poems` tables
- Seeded with ~200 magnetic poetry words
- TypeScript types generated from schema
- Tested: Full stack connection working (Next.js → Supabase → UI)

**Code Structure:**
- Route groups: `(auth)` and `(main)`
- Placeholder pages: login, signup, create, my-poems, browse
- Supabase clients: browser, server, proxy
- shadcn/ui initialized with Button component

**Key Decisions Made:**
- UUIDs for primary keys (vs BIGSERIAL) - better for distributed systems, unguessable URLs
- Migrated to proxy.ts (Next.js 16 pattern, was middleware.ts)
- Storing poems as `word_ids TEXT[]` not full text - enables future analytics
- Tailwind v4 (CSS-based config, not JavaScript)

### 🔄 In Progress

**Next Features (Week 1-2: Jan 1-14):**
- [ ] Implement authentication (Supabase Auth)
  - Sign up page
  - Login page
  - Logout functionality
  - Protected routes
- [ ] Display word tiles from database
  - Fetch words in /create page
  - Render as clickable tiles
  - Basic styling
- [ ] Basic click interaction
  - Click to select words
  - Add to poem composition area
  - Click to remove words

**Milestone:** Can display words and click them (not saved yet)

---

## Tech Stack

### Actual Versions Installed
- **Next.js:** 16.1.1 (App Router)
- **React:** 19.2.3
- **TypeScript:** 5.x
- **Tailwind CSS:** 4.x (CSS-based configuration)
- **Node:** 20+

### Frontend
- **Next.js 16** - Server Components, Server Actions, App Router
- **TypeScript** - Type safety throughout
- **Tailwind v4** - Utility-first CSS with `@theme` directive
- **shadcn/ui** - Copy-paste components (not a dependency)

### Backend/Database
- **Supabase** - Postgres database + Auth + Hosting
- **@supabase/ssr** - Server-side rendering helpers
- **No ORM** - Using Supabase client directly (decided against Prisma for v1)

### Deployment
- **Vercel** - Frontend hosting + serverless functions
- **Supabase Cloud** - Database hosting (free tier)

### Future Additions
- **@dnd-kit/core** - Drag-and-drop (v2 feature, NOT v1)

---

## Architecture

### File Structure
```
monostich/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── layout.tsx       # Centered layout for auth
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (main)/              # Main application pages
│   │   ├── layout.tsx       # Layout with nav bar
│   │   ├── create/page.tsx
│   │   ├── my-poems/page.tsx
│   │   └── browse/page.tsx
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Tailwind imports + theme
├── components/
│   └── ui/                  # shadcn components
│       └── button.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # For Client Components
│   │   ├── server.ts        # For Server Components
│   │   └── proxy.ts         # For middleware (auth refresh)
│   ├── actions/             # Server Actions (empty, ready)
│   └── utils.ts             # Utility functions (cn, etc.)
├── types/
│   ├── database.types.ts    # Generated from Supabase
│   └── index.ts             # Custom types
├── supabase/
│   ├── migrations/          # SQL migrations
│   └── seed.sql             # Word list data
└── proxy.ts                 # Next.js proxy (auth middleware)
```

### Data Model

```sql
-- words table (pre-populated, ~200 words)
CREATE TABLE words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- poems table
CREATE TABLE poems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  word_ids TEXT[] NOT NULL,  -- Ordered array of word IDs
  title TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_poems_user_id ON poems(user_id);
CREATE INDEX idx_poems_created_at ON poems(created_at DESC);
CREATE INDEX idx_poems_is_public ON poems(is_public) WHERE is_public = true;
```

**Key Decision:** Storing poems as ordered arrays of word IDs (not full text) enables:
- Exact word usage analytics later
- Perfect poem reconstruction
- Tracking which words are popular
- Future recommendation features

### Authentication Flow

```
User Request → proxy.ts (Next.js middleware)
             → Check auth cookies
             → Refresh tokens if needed
             → Allow/redirect

Protected Page → Server Component
              → Fetch user data
              → Render with auth context
```

**Files involved:**
- `proxy.ts` - Intercepts all requests, refreshes auth
- `lib/supabase/client.ts` - Browser client (for Client Components)
- `lib/supabase/server.ts` - Server client (for Server Components)
- `lib/supabase/proxy.ts` - Proxy client (for middleware)

---

## Scope Definition

### MUST HAVE (v1)
- [ ] Display word tiles from curated set
- [ ] Click to add words to poem composition area
- [ ] Click to remove words from poem
- [ ] Save poem (requires auth)
- [ ] View your saved poems
- [ ] User authentication (sign up, login, logout)
- [ ] Browse others' public poems
- [ ] Basic responsive design
- [ ] Deployed and live

### NICE TO HAVE (v1, if time)
- [ ] Simple like/favorite button
- [ ] Basic search or filter poems
- [ ] Simple word usage stats
- [ ] User can set poem visibility (public/private)

### NOT IN V1 (Future Features)
- ❌ Drag-and-drop word tiles (use click-to-arrange for v1)
- ❌ Spatial positioning (fridge magnet layout)
- ❌ Analytics dashboard
- ❌ Comments on poems
- ❌ User profiles
- ❌ Follow system
- ❌ Notifications
- ❌ Multiple word sets

**Principle:** Ship simple, iterate later.

---

## Build Phases

### Phase 1: Foundation (Week 1-2: Jan 1-14)
**Status:** In progress
**Goal:** Auth + basic interaction

**Tasks:**
- [x] Next.js setup
- [x] Deploy to Vercel
- [x] Supabase setup (local + cloud)
- [x] Database schema
- [x] Seed words table
- [ ] Implement auth (sign up, login, logout)
- [ ] Display word tiles
- [ ] Basic click interaction

### Phase 2: Core Feature (Week 3-4: Jan 15-28)
**Goal:** Save and view poems

**Tasks:**
- [ ] Build poem composition area
- [ ] Implement save functionality (Server Action)
- [ ] Create "Your Poems" page
- [ ] Fetch and display user's poems
- [ ] Basic error handling
- [ ] Styling (Tailwind)

### Phase 3: Social Features (Week 5-6: Jan 29 - Feb 11)
**Goal:** Public sharing

**Tasks:**
- [ ] Build public browse page
- [ ] Display all public poems
- [ ] Basic search/filter (optional)
- [ ] Like button (optional)
- [ ] Mobile responsive
- [ ] Polish UI

**⚠️ SCOPE WARNING:** If behind, CUT social features. Ship personal poem creator only.

### Phase 4: Ship (Week 7-8: Feb 12-25)
**Goal:** Documentation and polish

**Tasks:**
- [ ] UI polish
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Write README
- [ ] Screenshots
- [ ] Update resume

**SHIP DATE: February 25, 2026**

---

## Technical Decisions Log

### Architecture Choices

**Next.js over Vite/React:**
- Server Components for data fetching
- Built-in API routes (Server Actions)
- Easier deployment (Vercel)
- Industry demand

**Supabase over custom backend:**
- Auth included (don't build from scratch)
- Postgres database (real DB, not Firebase)
- Free tier sufficient
- Faster to ship

**Click-to-arrange over drag-and-drop (v1):**
- Simpler to implement
- Better mobile support
- Can add drag-and-drop in v2

**UUIDs over BIGSERIAL:**
- Unguessable URLs (security by obscurity)
- No enumeration attacks
- Works in distributed systems
- Supabase default

**Tailwind v4:**
- CSS-based configuration (`@theme`)
- No JavaScript config file needed
- Modern, cutting-edge approach

**Skip Prisma for v1:**
- Supabase client + generated types is sufficient
- Fewer moving parts = faster shipping
- Can add later if needed

---

## Decision Framework

### When Behind Schedule
- **Week 2:** Cut nice-to-haves (likes, search, stats)
- **Week 4:** Cut social features
- **Week 6:** Cut polish, ship functional
- **Week 8:** Ship whatever works

### When Stuck (>2 hours on one problem)
1. Google the error
2. Check Stack Overflow
3. Ask in Next.js Discord
4. Use Claude Code
5. **Timebox to 4 hours max** - then skip or find workaround

### When Adding Features
Write them in "Future Features" below. **Do NOT implement before v1 ships.**

---

## Future Features (v2+)

**Add AFTER v1 ships:**

### Interaction
- Drag-and-drop word tiles (@dnd-kit)
- Spatial positioning (fridge magnet style)
- Undo/redo
- Save draft poems

### Analytics & Data
- Word usage statistics
- "Your most-used words"
- Trending words
- Word combination analysis
- Poet style fingerprinting
- Recommendations

### Social
- Comments on poems
- User profiles
- Follow poets
- Feed of followed poets
- Share to social media

### Content
- Multiple word sets (nature, emotions, etc.)
- Remix others' poems
- Collaborative poems
- Daily prompts

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [React Server Components](https://react.dev/reference/rsc/server-components)

### Community
- Next.js Discord
- Supabase Discord
- Stack Overflow

---

## Interview Story

**Elevator pitch:**

"I built a constrained creation tool inspired by magnetic poetry kits. Users create poems by selecting word tiles from a curated set - like fridge magnets. I used Next.js 16 and Supabase, and designed the data model to enable future analytics on word usage patterns. The constraint actually makes it more interesting - both creatively and technically."

**Technical highlights:**
- Modern Next.js patterns (Server Components, Server Actions)
- Type-safe full-stack development
- Smart data modeling (storing IDs not text → enables analytics)
- Thoughtful UX decisions (click-to-arrange for mobile support)
- Shipped to production with CI/CD

**Connection to data engineering:**
- "In my day job I build data pipelines. I wanted a user-facing project that also showcased data thinking."
- Analytics potential: word usage patterns, poet behavior analysis
- Shows range: not just backend, can build full products

---

## Success Criteria

**This project is successful if:**
1. ✅ It's deployed and working
2. ✅ Code is visible on GitHub
3. ✅ You can demo it in interviews
4. ✅ You learned Next.js building it
5. ✅ It doesn't burn you out

**This project is NOT about:**
- Building the perfect app
- Competing with professional products
- Showcasing every skill
- Proving you're senior-level

**It's about:**
- Demonstrating you can ship
- Learning modern tools
- Having code to discuss
- Getting a job that lets you study properly

---

*Last updated: December 27, 2025 - Initial setup complete*
