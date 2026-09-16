# LensLoop

Runnable prototype for an outcome-first used-camera brief. A buyer chooses a moment, budget, experience level, and priority; the interface ranks explicit fictional kits, explains fit, and names tradeoffs. A FastAPI backend implements the same real domain operation and is tested locally and in CI.

**Demo data only:** no inventory, seller, condition, price, recommendation, or transaction is real. Matching is deterministic, not AI.

## Run

```bash
npm ci
npm run dev
```

Backend:

```bash
cd api
uv sync --frozen
uv run uvicorn main:app --reload
```

## Verify

```bash
npm run typecheck
npm run test:e2e
NEXT_PUBLIC_BASE_PATH=/lensloop-20260916 npm run build
npm audit --audit-level=high
cd api && uv sync --frozen && uv run pytest -q
```

The frontend statically exports to `out/` and works under a GitHub repository base path. GitHub Pages deploys only that frontend. FastAPI remains runnable/tested source and is not publicly hosted.

See [product plan](docs/PRODUCT.md), [Office Hours](docs/OFFICE_HOURS.md), [CEO review](docs/CEO_REVIEW.md), [architecture](docs/ARCHITECTURE.md), [build prompts](docs/BUILD_PROMPTS.md), and [source notes](research/notes.md).
