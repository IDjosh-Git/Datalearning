# Professional Course-Completion Certificates — v8.0

## What was redesigned

The certificate now uses one vector design for the in-app preview, landscape A4 printing/PDF saving, and 3,508 × 2,480 PNG export. All formats draw from the learner’s **issued database record** rather than editable form fields or mock data.

Certificate details:
- Learner’s recorded full name.
- Exact course title and authentic unique certificate ID.
- Issue date, issued-by name, and the passed instructor-assessed capstone achievement.
- Local, dynamically generated scannable verification QR that points to `verify.html?id=<issued ID>`.
- Printed description of the ten-module learning programme and the 70/100 capstone passing standard.
- Explicit statement that this is a course-completion award, not accredited professional licensure.

No unapproved signature, institution logo, accreditation seal or fabricated instructor name has been added. Institution names from external learning services do not appear on certificates.

## Learner experience
1. Sign in normally, study the weekly modules and complete the capstone.
2. An instructor must publish a passing grade before the existing trusted issue process creates the certificate.
3. Open **My Learning → Certificates → View & download** or **Capstone Studio → View full certificate**.
4. Print / Save PDF (A4 landscape), export a high-resolution PNG, or copy the verification link.

## Verification
The **Verify certificate** page is intentionally public: an employer can scan the QR or enter the ID without obtaining a learner account. It calls the existing public verification function and **accepts only status `active`**. Unknown and inactive IDs are not presented as valid. The public checker does not show private capstone uploads. Issuing, grading, learner records, and the full certificate library remain protected by account and administrator permissions.

The public verifier is a record lookup, **not an Open Badges 3.0 cryptographically signed credential**. Official validation depends on the live database being reachable and the deployment domain being correct.

## Implementation notes
- `assets/certificate-renderer.js`: safe escaped SVG template, local QR, print and PNG export.
- `assets/qr-local.js` and `assets/LICENSE-qrcode.txt`: bundled MIT-licensed QR encoder.
- `assets/certificate-premium.css`: responsive preview and A4 landscape print.
- `certificate.html`, `assets/certificate-viewer.js`: signed-in credential library viewer, learner-owned and admin-read access enforced by the existing row policies.
- `verify.html`, `assets/certificate-verify.js`, `assets/certificate-verify.css`: publicly accessible status-aware verification form.
- `account.html`, `capstone.html`, `assets/capstone.js`, `assets/progress-admin.js`: links and renderer integration.

## Validation performed
- Existing app, responsive, role, weekly-course, admin and public-language suites passed.
- Dedicated certificate test passed for issued record mapping, verification status handling, role restrictions and export/QR components.
- Chromium visual test: four course names rendered and QR successfully decoded to the verification URL.
- Image export: 3,508 × 2,480 PNG generated.
- A4 landscape PDF print test: one PDF page, inspected visually.
- Public verification simulated with active/revoked records: active accepted; revoked refused.

## Before publishing
1. Deploy the entire new ZIP with the new assets and pages.
2. Test a real issued certificate using a learner account and an admin account.
3. Scan the QR from the **deployed domain** (not a local preview), verify the exact ID, status, name and course.
4. Test browser PDF printing with background graphics enabled and orientation A4 landscape.
5. Confirm verification from a private browser window (signed out).
6. Review the published issuer identity and add only any legally authorized signature/seal you wish to use.

This package does not create, modify, or auto-approve certificates in the database. The existing instructor-controlled issuance rules are preserved.
