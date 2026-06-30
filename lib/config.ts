// Resolve the backend API base URL.
//
// All project data is fetched server-side (page, sitemap, detail), so a plain
// runtime `API_URL` works and avoids the NEXT_PUBLIC build-time inlining trap
// (NEXT_PUBLIC_* is baked in at `next build`, so changing it on Netlify needs a
// cache-cleared rebuild). Prefer the runtime var, fall back to the public one,
// then the demo default.
export const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://demo.masteringbackend.com/api/v3";
