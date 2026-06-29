# Silverback Deployment Readiness Checklist

## Code

- [ ] Latest files uploaded to GitHub.
- [ ] GitHub Actions deployment is green.
- [ ] `staticwebapp.config.json` is present.
- [ ] `api` folder is present.
- [ ] No secrets are committed.

## Security

- [ ] Aida owner account created.
- [ ] Michael owner account created.
- [ ] MFA enabled.
- [ ] Password reset required at first login.
- [ ] Silverback HQ blocks unauthenticated access.
- [ ] Client portal authentication plan confirmed before real client use.

## Data

- [ ] No sample clients.
- [ ] No sample appointments.
- [ ] No sample invoices.
- [ ] No mock notification history.
- [ ] CRM dashboard counts calculate from real records only.

## Notifications

- [ ] `SILVERBACK_NOTIFICATION_RECIPIENTS=aidamorales2014@gmail.com,michaelcocom@yahoo.com`
- [ ] Azure Queue Storage configured.
- [ ] Azure Communication Services sender verified.
- [ ] Booking confirmations tested.
- [ ] Reminder queue tested.
- [ ] Cancellation/update notices tested.

## Operations

- [ ] CRM add/edit/delete tested.
- [ ] Client intake tested.
- [ ] Business Health Assessment tested.
- [ ] Invoice creator tested.
- [ ] CSV/export tested.
- [ ] Notification History tested.

## Before Sending To Clients

- [ ] Privacy page reviewed by ownership.
- [ ] Terms page reviewed by ownership.
- [ ] Payment provider connected.
- [ ] E-signature provider connected.
- [ ] Backup process confirmed.
