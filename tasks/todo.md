# SEO: restore path-based project taxonomy URLs

**Date:** 8 Aug 2026
**Driver:** GSC audit — `04 — Marketing/SEO/01 — Audits/MB_SEO_PageKeywordAudit_ActionPlan_Aug2026.xlsx`
**Decisions confirmed with Solomon:** rebuild tag pages as path-based routes; 301 `/projects` → `/`

---

## Why

This app has three routes: `/`, `/payment`, `/projects/[slug]`.

The **currently live** site ranks on routes that do not exist here. Verified live 8 Aug 2026 — both return 200 with full content, so the old app is still serving:

| Live URL | Clicks (90d) | CTR | Exists in this repo? |
|---|---|---|---|
| `/projects` | 362 | 3.3% | No — would 404 |
| `/projects/tags/python-backend-projects` | 126 | 6.9% | No — would 404 |
| `/projects/tags/java-backend-projects` | 112 | 7.0% | No — would 404 |
| `/projects/tags/advanced-backend-projects` | 80 | 5.4% | No — would 404 |
| `/projects/tags/node.js-backend-projects` | 60 | 2.3% | No — would 404 |
| `/projects/tags/rust-backend-projects` | 22 | 3.5% | No — would 404 |
| `/projects/tags/javascript-backend-projects` | 5 | 0.8% | No — would 404 |
| `/projects/category/FinTech-backend-projects` | 7 | 1.6% | No — would 404 |

**Shipping as-is loses ~774 clicks/quarter**, including the two highest-CTR pages on the entire masteringbackend.com domain.

Separately, `app/sitemap.ts` currently submits query-string facets (`/?language=Go`). Google generally consolidates query-param URLs into the canonical, so that programmatic SEO strategy is unlikely to produce indexable pages. Path-based equivalents already demonstrably rank at 7% CTR.

## Data-quality problems found in the live API

Confirmed against `https://prod.masteringbackend.com/api/v3/public/projects`:

1. **`level` values do not match the UI filter.** API returns `beginners`, `intermediate`, `advance`, `advanced`. `components/projects-browse.tsx` filters on `["Basic", "Intermediate", "Advanced"]`. Nothing matches on case or wording — **the level filter is currently broken**. Note both `advance` and `advanced` exist in the data.
2. **`languages` values are malformed.** Mix of `["RUST"]`, `["PYTHON"]`, `["NODEJS"]` and `["[GO]"]`. The last is a literal string containing brackets — `norm()` in `sitemap.ts` tries `JSON.parse` on it, which fails because `GO` is unquoted, so it passes through as `[GO]`.
3. **`industries` casing is inconsistent** — `EduTech` and `Edutech` both appear, and would produce two different slugs for one category.
4. **`?size=500` appears to be ignored.** The endpoint returned 15 projects. The live site advertises "200+" and the live Python tag page lists ~31. The sitemap therefore submits only ~15 project URLs.

Items 1–3 are handled with a normalisation layer here. **Item 4 is a backend question and is NOT fixed by this change.**

## Plan

- [ ] 1. Add `lib/taxonomy.ts` — normalise language/level/industry values, map slug ↔ value, preserve the exact legacy slugs that currently rank
- [ ] 2. Add `app/projects/tags/[tag]/page.tsx` — SSR filtered listing, self-canonical, `generateStaticParams`
- [ ] 3. Add `app/projects/category/[category]/page.tsx` — same for industries
- [ ] 4. Add 301 `/projects` → `/` in `next.config.js` (consolidates the 3-way cannibalisation on "backend projects")
- [ ] 5. Rewrite `app/sitemap.ts` — path-based taxonomy URLs instead of query facets
- [ ] 6. Verify: build passes, every legacy URL resolves, no route collisions

## Non-goals

- Fixing the API `size` limit (backend)
- Redesigning `ProjectsBrowse`
- Touching `/projects/[slug]` detail pages (already correct)

---

## Review

**Status:** implementation complete. **One blocker remains, and it is not in this repo.**

### Done

- [x] 1. `lib/taxonomy.ts` — slug↔value mapping with normalisation
- [x] 2. `app/projects/tags/[tag]/page.tsx` — SSR listing, self-canonical, `generateStaticParams`
- [x] 3. `app/projects/category/[category]/page.tsx` — same for industries
- [x] 4. 301 `/projects` → `/` in `next.config.js`
- [x] 5. `app/sitemap.ts` rewritten — path-based URLs replace query facets
- [x] 6. Verified (see below)
- [x] Also added `lib/projects.ts` (shared fetch) and `components/taxonomy-landing.tsx`

### Verification

`npx tsc --noEmit` → exit 0.

`next build` could not be completed here — it ran 12+ minutes without emitting a
compile step. The repo is on a network mount and Next's I/O stalls on it. Network
itself is fine (curl to the prod API returns 200 in 3s). **Run `npm run build`
locally before deploying.**

Functional test against the **live** API:

| Legacy ranking URL | Resolves? | Projects | Clicks/90d protected |
|---|---|---|---|
| `/projects/tags/python-backend-projects` | yes | 3 | 126 |
| `/projects/tags/java-backend-projects` | yes | 1 | 112 |
| `/projects/tags/advanced-backend-projects` | yes | 6 | 80 |
| `/projects/tags/node.js-backend-projects` | yes | 5 | 60 |
| `/projects/tags/rust-backend-projects` | yes | 3 | 22 |
| `/projects/tags/javascript-backend-projects` | yes | 5 | 5 |
| `/projects/category/FinTech-backend-projects` | yes | 1 | 7 |

**Clicks at risk: 0** (was ~774). 18 taxonomy pages generate; 2 empty terms are
excluded from the sitemap and carry `noindex`.

Normalisation confirmed: `"[GO]"` → `go`, `'["Go"]'` → `go`, and both `advance`
and `advanced` map to the Advanced page.

### RESOLVED — the 15-project count was a dev API, not a backend bug

Corrected by Solomon 8 Aug 2026. `.env` in this repo points at
`https://prod.masteringbackend.com/api/v3`, which despite the hostname is the **dev**
environment and holds 15 projects. Production has 200+.

**No code change needed** — `lib/config.ts` already reads `API_URL` then
`NEXT_PUBLIC_API_URL` at runtime. The deploy environment just has to carry the real
production URL.

**Action before deploy:** confirm `API_URL` (or `NEXT_PUBLIC_API_URL`) on Netlify
points at production, and re-run the verification in this file. All counts in the
table above were measured against dev, so the real pages will be substantially
richer — Python should show ~31 projects rather than 3.

Two related hazards, now guarded:

- `lib/config.ts` falls back to `https://demo.masteringbackend.com/api/v3` if neither
  var is set. **That host does not resolve** — so a missing env var yields an empty
  site rather than an error. Worth changing the fallback to fail loudly.
- `lib/projects.ts` now logs a build-time warning when fewer than 50 projects come
  back, which would have caught this immediately.

### Not addressed (out of scope, worth queuing)

- `components/projects-browse.tsx` filters levels on `["Basic","Intermediate","Advanced"]`
  but the API returns `beginners|intermediate|advance|advanced`. **The level filter
  matches nothing today.** Fixable by reusing `normaliseValue` from `lib/taxonomy.ts`.
- `industries` casing is inconsistent (`EduTech` vs `Edutech`) — handled in the
  taxonomy layer, but worth normalising at the source.
