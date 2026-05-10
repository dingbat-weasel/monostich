# Principles

This document captures the reasoning behind the project structure and build sequence. It is stack-agnostic and applies to most web application projects. When in doubt about a decision, come back here.

---

## Separate what changes together

Your project has three layers that change at different rates and for different reasons:

- **Infrastructure** — changes rarely; when it does, it's high stakes
- **CI/CD** — changes occasionally, usually when your deployment process evolves
- **Application** — changes constantly, every feature and bug fix

The practical consequence: keep these layers structurally separate (monorepo folders, separate concerns) and solve each layer's problems on its own terms. Don't let application complexity bleed into infrastructure decisions, and don't let infrastructure complexity delay application development.

---

## Each phase produces something observable

If you're spending two weeks on a phase and nothing is observable yet, you've gone too deep. The phases are:

1. `docker compose up` → full local stack running
2. Push to main → deployed to a real URL
3. Features → a product people can use
4. Optimization → a product that handles load

Observable outputs keep you honest about progress and give you natural stopping points.

---

## Don't build Phase 4 in Phase 1

The most common mistake in project planning is designing for scale problems you don't have yet. Redis fan-out, read replicas, connection pooling, distributed tracing — these are real tools solving real problems. But the problems don't exist until you have real users generating real load. Designing for them upfront adds complexity without adding value, and forces architectural decisions before you have the information that only comes from running the thing.

Add infrastructure in response to evidence, not in anticipation of hypotheticals.

---

## Lean on Postgres before adding services

Postgres is more capable than most developers give it credit for. Before adding Redis, a search service, or any other external dependency, ask whether Postgres can handle it with proper indexing and query design. External services add operational complexity, failure modes, and things to learn. The bar for introducing one should be "Postgres demonstrably cannot do this" not "I've heard this is how it's done at scale."

---

## Auth is the API security boundary, not network obscurity

The backend ALB is internet-facing. This is intentional and conventional. A React SPA runs in the user's browser, outside your VPC, and needs to reach the API directly. Making the ALB private would make the API unreachable from the frontend.

"The API is publicly addressable" is not a vulnerability if auth is solid. A 401 from a properly secured endpoint is as good as a firewall for an attacker without credentials. The database being unreachable from outside the VPC is what actually matters at the infrastructure level.

The security layers are complementary and solve different problems:
- **VPC + security groups** — the database and internal resources are unreachable from the internet
- **JWT auth** — protected endpoints reject any request without a valid token, from any client
- **CORS** — browsers are prevented from making cross-origin requests on behalf of logged-in users
- **Rate limiting** — auth endpoints are throttled against brute force and credential stuffing
- **Secrets Manager** — credentials never appear in source control or images

Resist the instinct to add complexity (API Gateway, CloudFront routing tricks) to hide the ALB. It adds operational overhead without meaningfully improving security if auth is implemented correctly.

---

In React, the single most important discipline is this separation:

- A **custom hook** is a function that uses other hooks. It owns state, derived values, and actions. It knows nothing about rendering.
- A **component** calls a hook, gets back state and actions, and maps them to markup. It contains no business logic.

A component that does both things at once is hard to read, hard to test, and hard to change. When a component starts feeling complicated, the fix is almost always to extract a hook.

---

## Local interaction state vs. server state are different problems

Every application has two kinds of state:

- **Local interaction state** — exists only in the browser, hasn't touched the server. A form being filled out. Tiles being arranged on the compose board.
- **Server state** — lives in the database. Fetched, cached, and synchronized with the UI.

These have different lifecycles, different failure modes, and different update patterns. Don't mix fetch logic into hooks that manage UI interaction state. The moment a user submits — when local state becomes server state — is a concrete boundary worth understanding clearly.

---

## Build the state shape before building the UI

When approaching a complex interaction (like the tile composer), build and validate the state logic first using simple placeholder interactions (buttons). Get the transitions right. Then wire the real UI on top.

This applies to dnd-kit specifically: the library handles gesture detection and visual feedback. Your hook handles what a gesture means. If those concerns are tangled when you start integrating the library, you'll fight both problems at once.

---

## File structure should answer "where does this go?"

The value of a file structure isn't how it looks on day one. It's whether it gives you an obvious answer to "where does this new thing go?" six weeks in.

Feature-based organization (one folder per product feature, colocating components, hooks, and styles) does this well because the question becomes "which feature does this belong to?" rather than "what type of thing is this?"

The pages/features split reinforces this: pages are thin assemblers, features are self-contained slices. Deleting a feature folder should break nothing outside it except the page that imports it.

---

## CSS organization: scope by default, name with intention

Raw CSS gets messy because class names are global. The solution is structural (CSS Modules for local scoping) not just disciplinary (trying to remember not to reuse names).

Within a scoped module, use BEM-style naming (Block__Element--Modifier) for readability as files grow. Use CSS custom properties (design tokens) for your visual language — colors, spacing, type scale — so changes propagate consistently.

The result: full CSS power, no collisions, one source of truth for visual decisions.

---

## Secrets never touch source control

Database passwords, API keys, and tokens are injected at runtime via AWS Secrets Manager. They never appear in `.env` files committed to the repo, Docker images, or anywhere in source control. This is non-negotiable regardless of whether the repo is private.
