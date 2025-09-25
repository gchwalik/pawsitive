# ✅ Definition of Done Template (Simplified)

- [x] Meets acceptance criteria in the user story
- [x] Code compiles without errors/warnings
- [x] Peer review completed (Pita and 1+ other reviewers approve)
  - [x] Author adds manual test steps (when appropriate), reviewer follows them
- [x] Unit tests written for new/changed logic (green locally and in CI)
- [x] Code merged into main branch without conflicts
- [x] Documentation updated (inline comments, README, or API docs if applicable)

# Reference for future decisions

## General Guideline between small/large teams

| Aspect                 | Small Team DoD               | Large Team DoD                               |
| ---------------------- | ---------------------------- | -------------------------------------------- |
| **Code Review**        | 1 peer reviewer              | 2+ reviewers (peer + senior)                 |
| **Testing**            | Unit + manual smoke test     | Unit, integration, end-to-end, QA validation |
| **Docs**               | Minimal (README, inline)     | Formal docs, API specs, runbooks             |
| **CI/CD**              | Build + unit tests           | Build + tests + security + compliance        |
| **Release Validation** | Dev verifies in staging      | QA + Product sign-off + monitoring setup     |
| **Ownership**          | Developers do testing + docs | Shared across Dev, QA, DevOps, Product       |
