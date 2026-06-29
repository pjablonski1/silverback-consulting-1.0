# Silverback Security Configuration

## Current Production Controls

- HTTPS through Azure Static Web Apps.
- Security headers in `staticwebapp.config.json`.
- Silverback HQ route protection for approved Azure roles only.
- CRM JavaScript and CRM stylesheet are also protected so private CRM interface files are not publicly browsable.
- No API keys or passwords committed to the project.
- Email queue settings are environment-variable driven.
- CRM launches with clean real-data mode.

## Required Azure Settings

Add these values in Azure App Settings, not in GitHub:

- `SILVERBACK_NOTIFICATION_RECIPIENTS`
- `AzureWebJobsStorage`
- `EMAIL_QUEUE_NAME`
- `ACS_CONNECTION_STRING`
- `ACS_SENDER_ADDRESS`
- Provider keys for DocuSign, Stripe, Square, PayPal, Plaid, QuickBooks, and analytics when those providers are activated.

## Data Protection Rules

- Do not store card numbers, bank credentials, or passwords in the CRM.
- Store payment status and provider transaction IDs only.
- Store signed document metadata in the CRM, not private signing secrets.
- Use Azure Blob Storage with private containers for client files.
- Use expiring links for client document downloads.

## Audit Events To Review

Review activity logs for:

- Login and logout
- Client creation and edits
- Appointment changes
- Payment status updates
- Document signing status changes
- Portal messages
- Export activity

## Before Live Client Use

- Confirm MFA works for Aida and Michael.
- Confirm MFA works for `patinthecloud@yahoo.com`.
- Confirm Aida and Michael have `silverback_admin`.
- Confirm Patrick / Pat In The Cloud has `silverback_tech_admin`.
- Confirm unauthorized users cannot open `crm.html`.
- Confirm unauthorized users cannot open `crm.js` or `crm.css`.
- Confirm app settings are present.
- Confirm appointment queue sends to both owner emails.
- Confirm backups are scheduled.
