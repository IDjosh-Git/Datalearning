# Cloud-first, offline-resilient drafts

Implemented in `assets/scripts/cloud-workspace.js`:
- IndexedDB (`dalp-pending-drafts-v1`) stores **only pending, unconfirmed workspace edits**, scoped by authenticated Supabase user ID.
- Pending edits are restored before fetching cloud workspace state; a pending edit retains its original revision for optimistic concurrency control.
- Cloud writes use the existing `save_workspace_cas` RPC. Confirmed edits are removed from IndexedDB. Conflicting edits are not silently overwritten; the learner chooses cloud or device version.
- Connection recovery and tab focus trigger cloud hydration and retry. A save indicator displays `Saved to cloud`, `Saved on this device`, `Synchronising`, or `Action required`.
- Existing assessment/grading and official course-progress logic remain server-side; this patch does not introduce offline submission.

## Important limits
- Offline recovery requires IndexedDB availability and sufficient quota. If blocked, status displays `Unsaved: device storage unavailable`.
- Drafts remain on a device until confirmed uploaded; they are not accessible on a different device while offline.
- This package is **not deployed**. Real two-device, offline close/reopen, account-switching, conflict-dialog and browser storage tests are required before production sign-off.
- This patch covers workspace state via `DALP_STORAGE`, not every standalone learning-progress adapter. No claim of full offline recovery for course progress or submissions.
- Browser-stored drafts are accessible to scripts running on the same origin; consider encrypted-at-rest recovery and retention policies before handling sensitive learner content.
