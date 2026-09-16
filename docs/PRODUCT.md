# LensLoop product plan

## ICP and JTBD

Initial ICP: US parents planning a leisure trip within 30 days, ready to spend $700–$1,500 on a first serious used camera. JTBD: “When a meaningful trip is close, help me choose one trustworthy, portable kit without learning the entire camera market or risking an incompatible purchase.”

## MVP

An outcome brief, hard budget filtering, ranked inspected kits, explicit fit reasons and tradeoffs, and a refundable $29 human-review deposit credited toward purchase. The prototype ships the first four behaviors using fictional fixtures; it does not take payment.

## Data model

- `Kit`: body, lens, price, weight, condition grade, verification status, scenario tags, strengths, tradeoff, scored capabilities.
- `Brief`: scenario, maximum budget, experience, priority.
- `Recommendation`: policy version, kit, score components, reasons, tradeoff, rank.
- Future: `Inspection`, `InventoryUnit`, `Deposit`, `Order`, `OutcomeSurvey`, `Dispute`.

## Architecture and AI strategy

Next.js App Router renders a static, base-path-aware frontend. FastAPI owns a tested recommendation operation in source. GitHub Pages hosts only the frontend. Production would put the API behind authenticated inventory services and persist policy versions. Start deterministic: hard filters plus legible weights. Use an LLM later only to map natural-language intent into a typed brief and summarize verified evidence; never let it invent compatibility, condition, price, or availability.

## Economics

Proposed $29 refundable brief deposit. At an illustrative $1,400 basket and 18% take rate, gross platform revenue is $252. Target fully loaded contribution above $100 after inspection, payment, support, shipping subsidies, and returns. Rentals are excluded until measured utilization and damage economics exist.

## GTM and validation

Acquire the first 30 buyers through family-travel creators, compact-camera search queries, and concierge posts in relevant communities. Supply comes from one regional used-gear dealer or controlled consignment batch. Validate with 10 watched sessions: 4 deposits, under-four-minute median completion, top-two acceptance above 70%, zero-match under 35%, and three fulfilled sales before expanding scenarios.

## Moat

No moat exists in the current demo. The potential compounding asset is verified unit-level condition and compatibility data joined to outcome intent, recommendation decisions, returns, and post-trip satisfaction. A chat UI alone has no defensibility.

## Risks

Cold-start inventory, adverse selection, fraud, returns, condition disputes, recommendation liability, shipping damage, thin contribution, search incumbents, and suppliers bypassing the platform. Mitigate by curating supply, showing reasons, logging policy versions, and refusing bad matches.

## 30 / 60 / 90 days

- **30:** 10 buyer observations, deposit test, one dealer LOI, manual shortlist delivery.
- **60:** 30 paid briefs, inspected inventory feed, five fulfilled orders, return/dispute baseline.
- **90:** expand only the winning scenario, automate policy logging, test seller intake. Rentals remain gated on a separate operating pilot.
