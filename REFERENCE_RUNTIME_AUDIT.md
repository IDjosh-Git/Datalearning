# Runtime audit and database completion rule

## Actual runtime checks
- SQL: 80 snippets attempted with SQLite and a small synthetic orders/customers/products fixture. 33 executed successfully, 47 failed (primarily missing fixture fields or PostgreSQL-only SQL). These successes establish only execution in SQLite, not PostgreSQL correctness.
- Python: 18 snippets attempted in isolated subprocesses with pandas and a synthetic CSV. 11 executed successfully; 7 failed because of missing variables, fields, dependencies or other fixture requirements.
- DAX (78), Power Query (65), and Power Query M (18): no compatible runtime was available, so not executed or verified. The application explicitly labels them as not runtime-verified.
- Excel (380): numeric examples were previously calculated from synthetic inputs, but no Excel engine execution was performed in this pass.
- Full per-entry SQL/Python execution details are in `reference_execution_report.json`.

## Completion gate
- Connected Supabase project migration applied.
- Existing 38 completed rows snapshotted into a non-client-writable legacy table.
- Database trigger blocks new completion=true writes without an 80%+ quiz_results row, while preserving legacy completions.
- Negative test (new completion with no passing quiz) passed; post-migration completed count remained 38.
- **Security limitation:** Quiz results are written by clients. A malicious client can forge a passing quiz_results row, so this is not tamper-proof assessment enforcement. Fully trusted scoring requires server-graded assessments with protected answer keys and restricted quiz writes.
- No website deployment or browser end-to-end test performed.
