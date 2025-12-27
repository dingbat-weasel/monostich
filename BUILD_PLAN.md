# Monostich Build Plan
*Magnetic Poetry Web App - Career Transition Project*

**Last Updated:** December 27, 2025
**Target Ship Date:** February 25, 2026
**Status:** Planning → Starting Jan 1, 2026

---

## Project Overview

**What:** A web app inspired by magnetic poetry kits. Users arrange word tiles from a curated set to create poems, save them, and share with others.

**Why:** Portfolio project demonstrating full-stack skills, Next.js proficiency, and data thinking. Part of career transition from bootcamp → stable dev role.

**Core Constraint:** Fixed word set (like magnetic poetry) - this naturally limits scope and enables interesting analytics later.

---

## Timeline Context

### Current Situation (Dec 2025)
- **Work commitments:** 50 hrs/week
  - Data engineering (nonprofit): 20 hrs/week
  - Shop job: 15 hrs/week
  - Homestead management: 15 hrs/week
- **Available study time:** ~16-19 hrs/week
  - Mornings (7-8am): 7 hrs/week (Mon-Sun)
  - Thursday (1-4pm): 3 hrs/week
  - Friday (8:30-11:30am + 1-4pm): 6 hrs/week
  - Saturday (1-4pm, sometimes): 0-3 hrs/week

### Phase 1: Build Project (Jan 1 - Feb 25, 2026)
- **Duration:** 8 weeks
- **Time available:** 16-19 hrs/week = 130-150 total hours
- **Allocation:**
  - Thu/Fri/Sat afternoons: 12-15 hrs/week on poetry app (deep building)
  - Mornings: 4-7 hrs/week split between SICP, prep work, and rest
- **Goal:** Ship working v1 of poetry app
- **Buffer:** Extra hours provide cushion for life chaos, learning curve, higher quality v1

### Phase 2: LeetCode Ramp (March - April 2026)
- **Duration:** 8-10 weeks
- **Time available:** 23-26 hrs/week (shop job dropped, homestead time may decrease)
- **Allocation:**
  - Thu/Fri/Sat afternoons: 12-15 hrs/week on LeetCode (deep practice)
  - Mornings: 7 hrs/week on daily LC problems
  - Weekends: 2-4 hrs/week on SICP or interview prep
- **Goal:** Build LC competency (Easy comfortable, Medium approachable), start applying to jobs

### Phase 3: Interview Season (April - June 2026)
- **Duration:** 8-12 weeks
- **Goal:** Active interviewing, receive offers
- **Deadline:** Within 4-6 month financial runway (ends June)

### Financial Runway Note
**CRITICAL:** Financial stability depends on maintaining the nonprofit data engineering work (20 hr/week). As long as this continues, there's adequate income even after dropping shop job in March.

**This means:**
- Don't burn out - sustainable pace protects the nonprofit work
- Quality on nonprofit work is priority #1 (it's the financial lifeline)
- If nonprofit funding becomes uncertain, accelerate job search immediately
- Study schedule must not interfere with nonprofit work quality

**Risk management:** The nonprofit's funding situation is unclear. If you get signals that funding is at risk, pivot immediately to aggressive job applications (even with incomplete LC prep).

---

## 8-Week Build Schedule

### Week 1-2 (Jan 1-14): Foundation
**Goal:** Next.js setup, auth, database, basic UI

**Tasks:**
- [ ] Create Next.js 14+ project (App Router)
- [ ] Deploy "Hello World" to Vercel
- [ ] Set up Supabase (database + auth)
- [ ] Create database schema (users, poems, words tables)
- [ ] Seed words table with magnetic poetry word list
- [ ] Implement auth (sign up, login, logout)
- [ ] Display word tiles from database
- [ ] Basic click interaction (select words)

**Milestone:** Can display words and click them (not saved yet)

---

### Week 3-4 (Jan 15-28): Core Feature
**Goal:** Save poems and view your work

**Tasks:**
- [ ] Build "your poem" composition area
- [ ] Implement save poem functionality
- [ ] Create "Your Poems" page
- [ ] Fetch and display user's saved poems
- [ ] Basic error handling
- [ ] Simple styling (Tailwind)

**Milestone:** Complete creation flow - create, save, view your poems

---

### Week 5-6 (Jan 29 - Feb 11): Social Features
**Goal:** Public sharing and discovery

**Tasks:**
- [ ] Build public poems browse page
- [ ] Fetch and display all public poems
- [ ] Basic search/filter (optional)
- [ ] Simple like button (optional)
- [ ] Mobile responsive design
- [ ] Polish core UI

**Milestone:** Working social app - others can see and interact with poems

**⚠️ SCOPE WARNING:** If behind schedule by Week 6, CUT social features. Ship "create and save your own poems" only. Social can be added later.

---

### Week 7-8 (Feb 12-25): Ship
**Goal:** Polish and documentation

**Tasks:**
- [ ] UI polish and styling improvements
- [ ] Cross-browser testing
- [ ] Mobile testing and fixes
- [ ] Write excellent README with:
  - Project description
  - Tech stack and why
  - Architecture decisions
  - Setup instructions
  - Screenshots/demo
- [ ] Take screenshots for portfolio
- [ ] Update resume with project
- [ ] Final deployment and testing

**Milestone:** Shipped, documented, portfolio-ready project

**SHIP DATE: February 25, 2026**

---

## Tech Stack

### Frontend
- **Next.js 14+** (App Router) - Modern React framework, learning goal
- **TypeScript** - Type safety (optional but recommended)
- **Tailwind CSS** - Fast styling without CSS files
- **shadcn/ui** - Copy-paste component library (not a dependency)

### Backend/Database
- **Supabase** - Postgres database + Auth + Hosting (free tier)
  - Alternative: Vercel Postgres + Clerk auth
- **Prisma** - Type-safe ORM (optional, Supabase client is fine)

### Deployment
- **Vercel** - Frontend + API routes (free tier)
- **Supabase** - Database hosting (free tier)

### UI Interaction (Future)
- **@dnd-kit/core** - For drag-and-drop (v2 feature, NOT v1)
  - v1 uses click-to-arrange (simpler, works on mobile)

---

## Scope Definition

### MUST HAVE (v1)
✅ Display word tiles from curated set
✅ Click to add words to poem composition area
✅ Click to remove words from poem
✅ Save poem (requires auth)
✅ View your saved poems
✅ User authentication (sign up, login, logout)
✅ Browse others' public poems
✅ Basic responsive design
✅ Deployed and live

### NICE TO HAVE (v1, if time)
- Simple like/favorite button
- Basic search or filter poems
- Simple word usage stats
- User can set poem visibility (public/private)

### NOT IN V1 (Future Features)
❌ Drag-and-drop word tiles (use click-to-arrange for v1)
❌ Spatial positioning (fridge magnet layout)
❌ Analytics dashboard
❌ Word usage statistics
❌ Comments on poems
❌ User profiles
❌ Follow system
❌ Notifications
❌ Rich text formatting
❌ Multiple word sets
❌ User-created word sets

**Principle:** Ship simple, iterate later. Every feature added increases time to ship.

---

## Data Model

### Core Tables

```sql
-- words table (pre-populated)
CREATE TABLE words (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- poems table
CREATE TABLE poems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  word_ids TEXT[] NOT NULL,  -- ordered array of word IDs
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- likes table (optional, v1.1+)
CREATE TABLE likes (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, poem_id)
);
```

**Key Decision:** Store poems as ordered arrays of word IDs, not full text. This enables:
- Exact word usage analytics later
- Reconstruct poems perfectly
- Track which words are popular
- Future recommendation features

---

## Weekly Schedule Strategy

### Phase 1: Jan-Feb (Building Poetry App)

**Total: ~16-19 hours/week**

#### Mornings (7-8am daily)
**Best for:** SICP reading, documentation reading, small tasks, planning
**Not for:** Deep building, complex debugging

**Suggested split:**
- **Mon/Wed/Fri mornings (3 hrs/week): SICP** - Keep fundamentals alive at low intensity
- **Tue/Thu mornings (2 hrs/week): Poetry app prep** - Read Next.js docs, plan features, small CSS tweaks
- **Sat/Sun mornings (2 hrs/week): Rest or flex time** - Protect your energy

#### Afternoons (Deep Work Blocks)
**Best for:** Big features, complex debugging, integration work, learning new concepts, deployment

- **Thursday (1-4pm): 3 hours** - Major feature work
- **Friday (8:30-11:30am + 1-4pm): 6 hours** - Your biggest building day
- **Saturday (1-4pm, when available): 0-3 hours** - Integration, deployment, bug fixes

**Total poetry app building: 12-15 hrs/week in focused blocks**

#### Sample Week (Jan-Feb)

```
Monday:
  7-8am: SICP reading (1 hr)

Tuesday:
  7-8am: Read Next.js docs on Server Components (1 hr)

Wednesday:
  7-8am: SICP exercises (1 hr)

Thursday:
  7-8am: Plan what to build in afternoon (1 hr)
  1-4pm: Build auth flow (3 hrs)

Friday:
  8:30-11:30am: Build poem save functionality (3 hrs)
  1-4pm: Build "Your Poems" page (3 hrs)

Saturday:
  7-8am: Rest
  1-4pm (if available): Deploy to Vercel, fix bugs (3 hrs)

Sunday:
  7-8am: Rest
  Rest of day: Complete rest

Weekly Total: 16-19 hours
  - Poetry app: 13-16 hrs
  - SICP: 2-3 hrs
  - Rest: 2 hrs
```

---

### Phase 2: March-April (LeetCode Heavy)

**Total: ~23-26 hours/week** (shop job dropped)

#### Mornings (7-8am daily)
- **Mon-Fri (5 hrs/week): One LC problem per day** - Build consistency
- **Sat morning (1 hr): SICP** - Keep fundamentals alive
- **Sun morning (1 hr): Rest or review weak areas**

#### Afternoons (Deep Practice Blocks)
- **Thursday (1-4pm): 3 hours** - Work through Medium problems, focus on one pattern
- **Friday (8:30-11:30am + 1-4pm): 6 hours** - Pattern practice, mock interviews, harder problems
- **Saturday (1-4pm): 3 hours** - Review weak areas, system design basics, or SICP

**Total LC time: 17-20 hrs/week** (excellent volume for interview prep)

#### Sample Week (March-April)

```
Monday:
  7-8am: LC Easy/Medium problem (1 hr)

Tuesday:
  7-8am: LC problem (1 hr)

Wednesday:
  7-8am: LC problem (1 hr)

Thursday:
  7-8am: LC problem (1 hr)
  1-4pm: Deep dive on Two Pointers pattern (3 hrs)

Friday:
  7-8am: LC problem (1 hr)
  8:30-11:30am: Mock interview practice (3 hrs)
  1-4pm: Harder Medium problems (3 hrs)

Saturday:
  7-8am: SICP (1 hr)
  1-4pm: System design basics or review mistakes (3 hrs)

Sunday:
  7-8am: Rest or review notes
  Rest of day: Complete rest

Weekly Total: 23-24 hours
  - LeetCode: 19-20 hrs
  - SICP: 2 hrs
  - Rest: 2-3 hrs
```

---

### Phase 3: April-June (Interview Season)

**Total: Flexible 15-26 hrs/week** (depends on interview schedule)

#### Mornings (7-8am)
- **3-4 days/week: LC problems** - Stay sharp
- **2-3 days/week: Behavioral prep, review notes** - Prepare stories
- **1-2 days/week: Rest** - Interviews are exhausting

#### Afternoons (Flex based on interviews)
- **Interview days:** Focus on interview prep, company research
- **Between interviews:** LC maintenance, add poetry app features for fun, rest
- **Light weeks:** Work on other skills, SICP, system design

**Strategy:** Adapt weekly based on interview load. Active interview weeks might be 10 hrs study. Light weeks might be 25 hrs.

---

### General Principles

**Morning blocks (1 hour):**
✅ Good for: Reading, single LC problem, small tasks, documentation, planning
❌ Bad for: Complex debugging, learning entirely new concepts, big features

**Afternoon blocks (3-6 hours):**
✅ Good for: Deep building, complex debugging, integration, learning frameworks, flow state work
❌ Bad for: Quick tasks (use mornings instead)

**Protect your nonprofit work:**
- If you're exhausted, skip study time
- Quality on paid work > study goals
- Rest days are part of the plan

**Buffer time:**
- You have ~50 extra hours vs original plan (16-19 hrs/week vs 10 hrs/week)
- Don't try to "use" all of it - it's buffer for life, learning curves, rest
- Sustainable pace > maximum pace

---

## Key Advantages of This Schedule

### You Don't Have to Pause SICP Completely
With 16-19 hrs/week vs 10 hrs/week, you can maintain SICP at 2-3 hrs/week throughout Jan-Feb while still focusing primarily on the poetry app. This means:
- ✅ You stay connected to fundamentals
- ✅ Chapter 1 continues progressing (slowly but steadily)
- ✅ When you pivot to LC in March, you haven't lost all momentum
- ✅ SICP continues in March-April at same pace alongside LC

**The original plan:** Pause SICP completely Jan-Feb, resume in March
**The new plan:** Keep SICP alive at 2-3 hrs/week throughout

### More Sustainable Pace
- 16-19 hrs/week is intense but sustainable for 6 months
- Morning blocks (1 hr) are easier to maintain than forcing longer sessions
- Afternoon blocks (3-6 hrs) provide actual flow state time
- Built-in rest time protects against burnout

### Higher Quality Portfolio Project
- 130-150 total hours (vs 80) means you can:
  - Polish the UI more
  - Add better error handling
  - Write clearer code
  - Have time to refactor if needed
  - Still ship on time even if you hit learning curve issues

### Stronger LC Prep
- 17-20 hrs/week in March-April (vs 15-20 in original plan)
- Daily morning practice builds consistency
- Afternoon deep dives build real skill
- You'll be very well prepared for interviews

---

## Decision Framework

### When You're Behind Schedule

**Week 2:** Cut nice-to-haves (likes, search, analytics)
**Week 4:** Cut social features (just ship personal poem creator)
**Week 6:** Cut polish, ship functional but ugly
**Week 8:** Ship whatever works, document later if needed

**Never:** Add features beyond the MUST HAVE list before shipping

### When You're Stuck (>2 hours on one problem)

1. Google the error message
2. Check Stack Overflow
3. Ask in Next.js Discord
4. Ask Claude Code for help
5. **Timebox to 4 hours max** - then skip the feature or find workaround

**Don't let one bug kill a week.**

### When You Want to Add Features

Write them down in "Future Features" section below. Do NOT implement before v1 ships.

**Remember:** Done is better than perfect. Ship v1, iterate later.

---

## Success Criteria

### By Jan 11 (Week 2)
- ✅ Deployed URL exists
- ✅ Can create account and login
- ✅ Words display on screen
- ✅ Basic interaction works

### By Jan 25 (Week 4)
- ✅ Can create and save poems
- ✅ Can view your saved poems
- ✅ Auth fully working

### By Feb 11 (Week 6)
- ✅ Public poems browsing works
- ✅ Basic styling complete
- ✅ Mobile responsive

### By Feb 25 (Week 8) - SHIP DATE
- ✅ README written
- ✅ Resume updated
- ✅ Screenshots taken
- ✅ Proud enough to share with others

---

## Post-Ship Plan

### Immediate (Feb 26 - Mar 1)
- Update LinkedIn with project
- Share with bootcamp cohort / network
- Get feedback from friends
- Note bugs/improvements for v1.1

### March: Pivot to LeetCode
- **Stop adding features** (resist the urge)
- Focus 100% on LeetCode practice
- NeetCode 150 or Blind 75
- Aim for: Easy comfortable, Medium approachable

### April: Applications
- Start applying even if not feeling "ready"
- Target: 5-10 applications/week
- Continue LC practice (3-4 days/week)
- Interview prep (behavioral, system design basics)

### May-June: Interviews
- Active interviewing
- Maintain LC skills (do problems before interviews)
- Hopefully receive offers

### After Stable Job Secured
- Resume SICP study deeply
- Study discrete mathematics
- Add v2 features to poetry app (drag-and-drop, analytics)
- Learn from position of financial security

---

## Future Features (v2+)

**Add AFTER v1 ships and AFTER starting LeetCode:**

### Interaction Improvements
- Drag-and-drop word tiles (@dnd-kit)
- Spatial positioning (fridge magnet style)
- Undo/redo
- Save draft poems

### Analytics & Data
- Word usage statistics
- "Your most-used words"
- Trending words
- Word combination analysis (common pairs)
- Poet style fingerprinting
- Recommendation: "You might like these words"

### Social Features
- Comments on poems
- User profiles
- Follow other poets
- Feed of followed poets' work
- Share to social media

### Content Features
- Multiple word sets (original, nature, emotions, etc.)
- Remix others' poems
- Collaborative poems
- Daily word prompts

**Remember:** These are ideas for later. Do NOT add them before shipping v1.

---

## Resources

### Learning
- Next.js Tutorial: https://nextjs.org/learn
- Next.js Docs: https://nextjs.org/docs
- Supabase + Next.js Guide: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- Tailwind Docs: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com

### Community Help
- Next.js Discord (very active)
- Stack Overflow
- Supabase Discord

### Magnetic Poetry Words
- Google "magnetic poetry original word list"
- Should find CSV or text lists of 100-200 words
- Can start with subset for testing

---

## Notes & Reflections

### Architecture Decisions

**Why Next.js over Vite/React:**
- Learning goal - Next.js is in demand
- Server components for data fetching
- API routes built-in (no separate backend)
- Easier deployment (Vercel)

**Why Supabase over custom backend:**
- Auth included (don't build from scratch)
- Postgres database (real DB, not Firebase)
- Free tier sufficient for portfolio project
- Faster to ship

**Why click-to-arrange over drag-and-drop for v1:**
- Much simpler to implement
- Works better on mobile
- Faster to ship
- Can add drag-and-drop in v2

### Connection to Career Goals

**This project demonstrates:**
- Full-stack capability (frontend + backend + database)
- Modern framework proficiency (Next.js)
- Product thinking (constrained creation tool)
- Data modeling (structured word data enables analytics)
- Shipping ability (portfolio piece with visible code)

**Interview story:**
"I built a constrained creation tool inspired by magnetic poetry kits. Users create poems by selecting word tiles from a curated set - like fridge magnets. I used Next.js and Supabase, and designed the data model to enable future analytics on word usage patterns. The constraint actually makes it more interesting - both creatively and technically."

**How it connects to current work:**
- Data pipeline experience: "In my day job I build data pipelines. I wanted a user-facing project that also showcased data thinking."
- Analytics potential: Word usage patterns, poet behavior analysis
- Shows range: Not just backend/data work, can build full products

---

## Weekly Check-In Template

**Copy this each Saturday:**

```markdown
## Week X Check-In (Date)

**Hours this week:** X/16-19 (or X/23-26 if March+)
**Goal for this week:** [from schedule above]
**What I accomplished:**
-
-
**What I'm stuck on:**
-
**Decisions made:**
-
**Next week's focus:**
-
**On track? Yes/No - if no, what to cut?**
**Energy level:** High/Medium/Low - adjust next week accordingly
```

---

## Emergency Contacts

**When stuck, blocked, or discouraged:**
- Come back to Claude Code with specific questions
- Don't struggle alone for more than 4 hours
- Ask for help early, not after days of frustration

**When scope is creeping:**
- Re-read "Scope Definition" section
- Ask: "Does v1 need this, or is it v2?"
- When in doubt, cut it

**When behind schedule:**
- Don't panic
- Cut features (refer to Decision Framework)
- Ship something smaller rather than nothing
- Extend timeline only if absolutely necessary

---

## Mental Game Reminders

**You will feel:**
- "I only have 1 hour, what's the point?"
  - → 1 hour × 7 days = 7 hours of progress. Morning blocks add up fast.

- "Everyone else studies full-time, I'm behind"
  - → You work 50 hrs/week AND study 16-19 hrs/week. That's 65+ hrs/week total. You're not behind.

- "This is taking forever"
  - → 8 weeks with 16-19 hrs/week is realistic and on track. You have buffer time built in.

- "I should add this cool feature..."
  - → Write it in Future Features, ship v1 first.

- "I'm too tired to work on the poetry app today"
  - → That's fine. Rest. Your nonprofit work pays the bills - protect that first.

- "I have extra hours this week, I should add more features"
  - → No. Extra hours are buffer for life, learning curves, and rest. Don't fill them artificially.

**Remember:**
- You're not racing others
- You're building a sustainable path
- Done is better than perfect
- Ship v1, improve from stability
- **Nonprofit work quality > study time** - it's your financial lifeline

---

## Success Definition

**This project is successful if:**
1. ✅ It's deployed and working by March 1
2. ✅ Code is visible on GitHub
3. ✅ You can demo it in interviews
4. ✅ You learned Next.js building it
5. ✅ It doesn't burn you out

**This project is NOT about:**
- Building the perfect app
- Competing with professional products
- Showcasing every skill you have
- Proving you're already senior-level

**It's about:**
- Demonstrating you can ship
- Learning modern tools
- Having code to discuss in interviews
- Getting a job that lets you study properly

---

*Good luck. You've got this. See you Jan 1, 2026.*
