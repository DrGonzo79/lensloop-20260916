# Phased build prompts

1. **Demand instrument:** Add anonymous brief analytics and refundable deposit intent. Preserve typed events, consent, and a no-tracking mode. Test abandonment and duplicate submits.
2. **Authoritative policy:** Extract the ranking policy into one versioned contract used by FastAPI and fixture generation. Add golden contract tests and policy rollback.
3. **Verified supply:** Add authenticated dealer inventory, unit-level inspection records, reservation expiry, stale-price handling, and an operator reconciliation screen.
4. **Human review:** Route deposits to an operator queue with reason-coded overrides, response SLA, audit log, and buyer-visible correction states.
5. **Transactions:** Integrate a hosted payment provider, order state machine, returns, disputes, shipping insurance, and contribution reporting. Do not store card data.
6. **Natural-language intake:** Add a constrained model that produces a `Brief` JSON object. Log model/prompt versions, reject unsupported claims, evaluate extraction, and retain deterministic ranking.
7. **Rental pilot:** Only after purchase economics work, pilot 20 local units with identity checks, deposits, condition photos, turnaround metrics, loss/damage policy, and owner payout ledger.
