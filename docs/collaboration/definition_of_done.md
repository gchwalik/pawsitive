# General Guideline between small/large teams

| Aspect                 | Small Team DoD               | Large Team DoD                               |
| ---------------------- | ---------------------------- | -------------------------------------------- |
| **Code Review**        | 1 peer reviewer              | 2+ reviewers (peer + senior)                 |
| **Testing**            | Unit + manual smoke test     | Unit, integration, end-to-end, QA validation |
| **Docs**               | Minimal (README, inline)     | Formal docs, API specs, runbooks             |
| **CI/CD**              | Build + unit tests           | Build + tests + security + compliance        |
| **Release Validation** | Dev verifies in staging      | QA + Product sign-off + monitoring setup     |
| **Ownership**          | Developers do testing + docs | Shared across Dev, QA, DevOps, Product       |

# ✅ Definition of Done Template (Simplified)

- [x] Meets acceptance criteria in the user story
- [x] Code compiles without errors/warnings
- [x] Peer review completed (at least two team member reviews PR)
- [x] Unit tests written for new/changed logic (green locally and in CI)
- [x] Code merged into main branch without conflicts
- [x] Documentation updated (inline comments, README, or API docs if applicable)
- ~~[x] Feature/bug verified manually (smoke test in dev/staging environment)~~
- ~~[x] No critical performance/security issues introduced~~
- ~~[x] Feature toggle/rollback plan considered (if applicable)~~

# ✅ Definition of Done Template

### 🔹 Code Quality

- [ ] Code compiles with no errors or warnings
- [ ] Code is clean, readable, and follows team conventions
- [ ] At least one peer has reviewed and approved the PR

### 🔹 Testing

- [ ] Unit tests cover new/changed logic
- [ ] All tests (unit + integration) pass locally and in CI
- [ ] Manual smoke test confirms the feature/bug fix works as expected

### 🔹 Documentation

- [ ] Inline code comments explain complex logic
- [ ] README / relevant docs updated if functionality or setup changed
- [ ] API/interface changes documented for other team members

### 🔹 Functionality

- [ ] Meets acceptance criteria in the story/ticket
- [ ] No known high-priority bugs remain unfixed
- [ ] Rollback/disable strategy considered (feature toggle, etc.)

### 🔹 Delivery

- [ ] Branch merged into `main` without conflicts
- [ ] Deployed successfully to staging/dev environment
- [ ] Verified by the assignee (or pair reviewer) in staging/dev
