# Monostich - Project Context

**Last Updated:** January 8, 2026
**Status:** Auth complete ✅ | Building word interaction (Week 2)
**Target Ship Date:** February 25, 2026
**Live URL:** [your-vercel-url]

---

## Project Overview

**What:** A web app inspired by magnetic poetry kits. Users arrange word tiles from a curated set to create poems, save them, and share with others.

**Why:** Portfolio project demonstrating full-stack skills, Next.js proficiency, and data thinking. Part of career transition from bootcamp → stable dev role.

**Core Constraint:** Fixed word set (like magnetic poetry) - this naturally limits scope and enables interesting analytics later.

---

## Current Status

### ✅ Completed

**Infrastructure (Dec 27, 2025):**

- Next.js 16.1.1 with TypeScript, Tailwind v4, ESLint
- Supabase local development environment
- Supabase cloud production database
- Deployed to Vercel (production-ready)
- Git repository with initial commits

**Database (Dec 27, 2025):**

- Schema created: `words` and `poems` tables
- Seeded with ~200 magnetic poetry words
- TypeScript types generated from schema
- Tested: Full stack connection working (Next.js → Supabase → UI)

**Authentication (Jan 8, 2026):**

- ✅ Sign up page with validation (Zod schemas)
- ✅ Login page with error handling
- ✅ Logout functionality
- ✅ Protected routes via middleware
- ✅ Session management (Supabase Auth + @supabase/ssr)
- ✅ Route protection logic:
  - Logged-in users redirected from /login, /signup → /
  - Non-authenticated users redirected from /create, /my-poems → /login
  - Redirect preservation (return to intended page after login)
- ✅ Dynamic nav bar (shows "Log in" or "Log out" based on auth state)
- ✅ Form validation with field-specific errors
- ✅ Server Actions for auth (useActionState pattern)

**Code Structure:**

- Route groups: `(auth)` and `(main)`
- Auth pages: LoginForm, SignupForm (Client Components with Server Actions)
- Supabase clients: browser, server, proxy
- shadcn/ui components: Button, Input, Label, Field system
- Server Actions: `lib/actions/auth.ts` (signup, login, logout)
- Type definitions: `lib/definitions/auth.ts` (Zod schemas, FormState types)

**Key Decisions Made:**

- UUIDs for primary keys (vs BIGSERIAL) - better for distributed systems, unguessable URLs
- Migrated to proxy.ts (Next.js 16 pattern, was middleware.ts)
- Storing poems as `word_ids TEXT[]` not full text - enables future analytics
- Tailwind v4 (CSS-based config, not JavaScript)
- Supabase Auth over custom auth - faster shipping, production-ready security
- Server Actions with useActionState - modern Next.js pattern for forms
- Username stored in user_metadata (not separate table for v1)

### 🔄 In Progress

**Current Focus (Week 2: Jan 8-14):**

- [ ] Basic click interaction
  - Click to select words
  - Add to poem composition area
  - Click to remove words
  - Visual feedback for selected state

**Next Up:**

- [ ] Poem composition area UI
- [ ] Save poem functionality (Server Action)
- [ ] Display user's saved poems

**Milestone:** Can compose and save poems (Phase 1 complete)

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
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   └── LoginForm.tsx     # Client Component
│   │   └── signup/
│   │       ├── page.tsx
│   │       └── SignupForm.tsx    # Client Component
│   ├── (main)/              # Main application pages
│   │   ├── layout.tsx       # Layout with dynamic nav bar
│   │   ├── create/page.tsx
│   │   ├── my-poems/page.tsx
│   │   └── browse/page.tsx
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Tailwind imports + theme
├── components/
│   └── ui/                  # shadcn components
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── field.tsx        # Field component system
│       └── separator.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # For Client Components
│   │   ├── server.ts        # For Server Components
│   │   └── proxy.ts         # For middleware (auth refresh + protection)
│   ├── actions/
│   │   └── auth.ts          # Server Actions (signup, login, logout)
│   ├── definitions/
│   │   └── auth.ts          # Zod schemas and types
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

**User signs up/logs in:**

```
Client Form → Server Action (lib/actions/auth.ts)
           → Validate with Zod schema
           → supabase.auth.signUp() or signInWithPassword()
           → Supabase sets HTTP-only cookies
           → Redirect to app
```

**Every request (middleware protection):**

```
User Request → proxy.ts
            → lib/supabase/proxy.ts: getClaims()
            → Check if user is authenticated
            → Route protection logic:
               - If logged in + visiting /login → redirect to /browse
               - If NOT logged in + visiting /create → redirect to /login
            → Refresh auth tokens if needed
            → Allow request / redirect
```

**Protected page (Server Component):**

```
Server Component → createClient() from lib/supabase/server
                → supabase.auth.getUser()
                → Fetch user-specific data
                → Render with auth context
```

**Files involved:**

- `proxy.ts` - Intercepts all requests, applies route protection
- `lib/supabase/proxy.ts` - Middleware client (getClaims, token refresh)
- `lib/supabase/server.ts` - Server Component client
- `lib/supabase/client.ts` - Client Component client (for future use)
- `lib/actions/auth.ts` - Server Actions for signup, login, logout
- `lib/definitions/auth.ts` - Zod schemas and TypeScript types

---

## Scope Definition

### MUST HAVE (v1)

- [x] User authentication (sign up, login, logout) ✅
- [x] Display word tiles from curated set ✅ (in /create)
- [ ] Click to add words to poem composition area
- [ ] Click to remove words from poem
- [ ] Save poem (requires auth)
- [ ] View your saved poems
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

**Status:** Nearly complete (90%)
**Goal:** Auth + basic interaction

**Tasks:**

- [x] Next.js setup
- [x] Deploy to Vercel
- [x] Supabase setup (local + cloud)
- [x] Database schema
- [x] Seed words table
- [x] Implement auth (sign up, login, logout) ✅
- [x] Display word tiles ✅
- [ ] Basic click interaction ← **Current focus**

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

## Implementation Notes

### Authentication Implementation (Jan 8, 2026)

**What we built:**

- Full authentication flow using Supabase Auth + Next.js 16 patterns
- Server Actions with `useActionState` for form handling
- Zod validation schemas with field-specific error messages
- Route protection middleware with smart redirects
- Dynamic navigation based on auth state

**Key learnings:**

- Supabase handles password hashing, session management, and token refresh automatically
- Don't hash passwords before passing to Supabase (double hashing breaks login)
- `useActionState` requires specific function signature: `(prevState, formData) => newState`
- Zod's `flattenError()` returns `{ formErrors: [], fieldErrors: {} }` structure
- Middleware runs on EVERY request - keep it lightweight
- `getClaims()` in middleware refreshes tokens transparently
- Route protection preserves intended destination via searchParams

**Patterns established:**

- Server Actions in `lib/actions/`
- Type definitions and schemas in `lib/definitions/`
- Client Components for forms, Server Components for data fetching
- Form state managed by `useActionState`, not local React state

---

_Last updated: January 8, 2026 - Authentication complete_
