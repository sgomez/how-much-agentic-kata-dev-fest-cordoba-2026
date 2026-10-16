---
status: accepted
---

# Question content lives in the repository

Supersedes ADR-0005. The base questions are committed as `data/questions.json`, and the catalog loads them from `CATALOG_FILE` (default that file). Handing the file to every group on the day, each one downloading it into a gitignored folder, costs more than keeping the content out of a public repository is worth. The schema (`QuestionsFile` in `@hmk/contracts/catalog`), the validator (`pnpm catalog:validate <file>`) and the synthetic fixtures stay as they were.

## Consequences

- Cloning the repository is enough to play with the real questions; the synthetic sample only appears if the file goes missing.
- The answers are public, in this repository and in every fork.
- Tests and acceptance tests still never depend on real content: the acceptance DSL rigs the next question in test mode (`HMK_TEST_MODE=1`).
- Changing a question takes a commit; `CATALOG_FILE` still points the catalog at another file without one.
