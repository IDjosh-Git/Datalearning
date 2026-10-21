# Implementation status — October 21, 2026

## Implemented
- Existing offline read-only SQL teaching interpreter and spreadsheet formula evaluator.
- Added **two deterministic alternate datasets** per exercise to catch hard-coded answers. Grades must match the reference answer on original and both alternate datasets.
- Hidden scenario data never leave the learner’s browser. The additional data are deterministic and can be inspected in source; this is robustness checking, not secure proctoring.
- The SQL interpreter is NOT full SQLite; the spreadsheet evaluator is NOT complete Excel. No database/WASM or formula runtime is included in the supplied archive, and none could be fetched in this isolated environment.
- Existing course checkpoints remain active.

## Outstanding before production claims
- Bundle a properly licensed offline SQLite WASM distribution and integrate its database initialization and robust browser execution.
- Integrate an established spreadsheet calculation engine with error propagation, references, and cross-sheet support.
- Update the stale asset-versioning expectations in legacy regression tests and exercise a complete browser workflow with authentication/cloud-dependent paths mocked.
- Review reference solutions and assessment validity with teaching staff.
