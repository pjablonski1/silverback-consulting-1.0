# Silverback Consulting Live-Ready Checklist

Use this before publishing the site publicly.

## Business Details
- Confirm final company legal name: Silverback Consulting LLC.
- Confirm business email: sbph2026@gmail.com or official domain email.
- Confirm Michael and Aida notification emails.
- Confirm phone number, address/service area, and preferred contact method.
- Confirm final service descriptions, pricing language, and engagement terms.

## Legal / Compliance
- Have an attorney review Privacy Policy, Terms of Use, Accessibility Statement, client agreement, disclosures, and payment/refund terms.
- Confirm whether investment-related language requires additional disclosures or restrictions.
- Confirm whether business setup guidance needs legal/tax disclaimers by state.
- Add final refund, cancellation, invoice, and late payment language.

## Hosting / Azure
- Deploy through Azure Static Web Apps or equivalent.
- Keep `staticwebapp.config.json` with security headers enabled.
- Connect custom domain and SSL.
- Replace browser localStorage CRM with backend database.
- Add environment variables for API keys and secrets.

## Authentication / Security
- Replace temporary access codes with Azure AD B2C or comparable authentication.
- Enable MFA for admin and client portal access.
- Use role-based permissions for admin, team member, client, and investor views.
- Store documents in secure cloud storage with signed URLs.
- Add server-side audit logs for login, documents, payments, messages, and data changes.

## Email Notifications
- Deploy the included Azure Functions in the `api` folder.
- Set API location to `api` in Azure Static Web Apps.
- Configure Azure Queue Storage for appointment email events.
- Verify Azure Communication Services sender domain and `ACS_SENDER_ADDRESS`.
- Set `SILVERBACK_NOTIFICATION_RECIPIENTS` to `aidamorales2014@yahoo.com,cocommichael@yahoo.com`.
- Confirm booking, reminder, cancellation, reschedule, failed, and retry events appear in Silverback HQ notification history.
- Add email templates for appointments, investor intake, client messages, document signing, and payments.

## Payments / Banking
- Connect Stripe or other payment processor for cards, Apple Pay, Google Pay, and ACH.
- Connect PayPal/Venmo if required.
- Connect Plaid Link through backend token exchange only.
- Do not store full card numbers, banking credentials, or Plaid access tokens in browser storage.
- Add webhook handlers for payment success, failed payments, refunds, and invoice status updates.

## Documents
- Connect DocuSign or equivalent e-signature provider.
- Use signed agreements and disclosures before onboarding clients.
- Store signed copies securely.
- Add webhook logging for completed, declined, or expired envelopes.

## QA
- Test desktop, tablet, and mobile.
- Test keyboard navigation and screen reader basics.
- Test all links, forms, modals, AI chat, client portal, CRM, Privacy, Terms, Accessibility, and 404 page.
- Test bad URL behavior after deployment.
- Verify no temporary-release wording appears in public-facing production pages.
