# CEO Review: LensLoop

**Mode:** Scope reduction. The source proposes an agent, marketplace, and rental fleet. The accepted demo proves only the highest-leverage buyer workflow.

## Nuclear challenge

The business outcome is a trusted purchase, not a clever recommendation. A generic shopping agent is a commodity; a broad marketplace is a liquidity trap. LensLoop must earn trust through legible constraints, verified-condition inventory, and honest “no fit” results.

CURRENT: fragmented browsing and idle gear → THIS DEMO: outcome brief with transparent deterministic ranking → 12-MONTH IDEAL: curated supply, inspection records, deposit-backed buyer demand, and measured post-trip outcomes.

## Strongest challenges and decisions

1. **Cold-start liquidity:** defer open listings. Seed a narrow catalog through dealers or consignment intake.
2. **Recommendation liability:** never present certainty. Show the score components, incompatibilities, and what requires human verification.
3. **Rental economics:** defer rentals until loss, damage, turnaround time, and utilization are observed. A spreadsheet margin is not an operating model.

## Architecture review

The domain operation is a pure ranking pipeline shared conceptually by the static demo and FastAPI source:

```text
trip brief → validation → hard budget/use-case filters → weighted scoring
          ↘ invalid/empty       ↘ zero matches → named recovery
                                      ↘ ranked kits + reasons/tradeoffs
```

The static frontend uses local fixtures because GitHub Pages cannot host FastAPI. Production should make the API authoritative and version recommendation policies.

## Error and interaction map

- Empty use case → `invalid_brief`; inline prompt, no stale results.
- Budget below $300 or above $5,000 → `invalid_budget`; bounded correction.
- No kit within budget → `no_match`; recommend widening budget, never silently exceed it.
- Double submit → button locks during simulated analysis.
- Selection after reranking → selection resets, preventing stale-kit checkout intent.
- Upstream inventory unavailable (future) → `inventory_unavailable`; no cached “available” claims.

## Security and data

The demo collects no identity, payments, images, or seller data. Validate enum and numeric inputs in both layers. Production requires authenticated inventory mutations, signed media uploads, payment-provider tokenization, audit logs, fraud controls, and deletion policies. Never let review text become an executable prompt without delimiting and filtering.

## API contract

`POST /recommendations` accepts `scenario`, `budget`, `experience`, and `priority`; it returns ranked kits, component scores, reasons, tradeoffs, and a transparent demo-data marker. Errors are typed with 422 validation or an empty result with recovery guidance.

## Economics and GTM

Start with a refundable $29 brief deposit credited toward purchase. Target $250+ contribution per completed sale: 18% take rate on a $1,400 basket yields $252 before inspection, payment, support, and returns. If fully loaded contribution is below $100, paid acquisition is not viable. Recruit demand through family-travel creators and high-intent search; seed supply via one regional dealer, not consumer listing ads.

## Observability

Track brief-start/completion, zero-match rate, top-two acceptance, deposit conversion, human override reason, return rate, condition disputes, time-to-ship, and contribution per order. Alert on inventory feed failure, recommendation error spikes, zero-match above 35%, and condition disputes above 3%.

## Test review

Cover valid ranking, hard budget exclusion, invalid values, no-match recovery, loading lock, selection reset, accessible controls, desktop flow, and mobile overflow. Contract fixtures must remain explicit and fictional.

## Accepted scope

- Outcome-based brief
- Three fictional verified kits
- Transparent scores and tradeoffs
- Selectable shortlist and seller-side idle-value illustration
- FastAPI ranking source and tests

## Deferred / not in scope

Accounts, payments, live inventory, listings, chat, image analysis, escrow, shipping, insurance, rentals, real AI, and real pricing. These are deferred because they test operations before buyer intent.
