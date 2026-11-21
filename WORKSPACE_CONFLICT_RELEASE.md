# DataLearning workspace concurrency release

## Implemented
- Live Supabase `save_workspace_cas` RPC with per-item revision check and row lock.
- Cloud workspace frontend uses expected revisions and refuses silent stale overwrites.
- A conflict dialog offers cloud or local version, preserving unsaved edits in memory until selection.
- Existing atomic practice completion merge remains in place.

## Limitations / verification required
- Two authenticated browser/device sessions were not available for a full live end-to-end test.
- Some lesson progress and other surfaces need independent concurrency review.
- No complete browser DevTools audit of IndexedDB, Cache Storage, cookies, and SDK internals.
- Local drafts are only in RAM until saved; closing an offline tab loses unsaved data.
- No frontend production deployment performed.
- Legacy localStorage is still read to import previous data and removed after successful import.
- Supabase authentication can retain session data on device.
