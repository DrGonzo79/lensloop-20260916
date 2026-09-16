# Architecture

```text
GitHub Pages
  Next.js static UI ── imports ── fictional kits.json
       │
       └── deterministic demo ranker (no network dependency)

Runnable source / future host
  POST /recommendations ── validate Brief ── hard filters ── score ── ranked response
  GET /health
```

The duplicated ranking rule is intentional for this static-host prototype. Production must generate a versioned policy package or make FastAPI authoritative to prevent drift. The API has no database, external calls, secrets, authentication, or live inventory. GitHub Pages does not deploy Python.

Failure contracts: invalid typed input returns 422; valid input with no affordable inventory returns an empty list plus recovery guidance; the UI clears stale selection whenever inputs change and labels all simulated state.
