# Silverback HQ CRM User Manual

## Purpose

Silverback HQ is the internal command center for Silverback Consulting. It is designed to help Aida and Michael manage clients, appointments, tasks, business assessments, onboarding, documents, invoices, notifications, and follow-up work from one place.

## Access

For the live Azure site, Silverback HQ should be opened by authorized owners only through Microsoft login.

Local preview access is only for testing and should not be treated as production security.

## Main Areas

### Overview

Use the Overview section to see current CRM health:

- Client count
- Open tasks
- Appointments
- Payments
- Documents
- Activity

All dashboard totals should come from real CRM records only.

### Clients

Use Clients to add and manage real consulting clients.

Recommended first fields:

- Client Name
- Business Type
- Current Phase
- Status
- Monthly Revenue
- Monthly Profit
- Biggest Problem
- Current Project
- Next Action
- Last Contact

Use search and filters to quickly locate a client.

### Lifecycle Pipeline

Move clients through the full Silverback process:

1. New Lead
2. Consultation Requested
3. Consultation Scheduled
4. Consultation Completed
5. Proposal Sent
6. Proposal Accepted
7. Required Documents Sent
8. Waiting for E-Signatures
9. Payment Required
10. Payment Received
11. Client Activated
12. Project In Progress
13. Project Completed

Do not activate a client until required documents and payment status are complete.

### Business Health Assessment

Use the assessment during onboarding or business review.

Sections include:

- Company Profile
- Legal Foundation
- Financial Organization
- Operations & Accountability
- Marketing, Sales & Growth

Save drafts during meetings, resume later, and export when needed.

### Tasks

Use Tasks for daily, weekly, and monthly owner priorities.

Recommended task fields:

- Task
- Client
- Priority
- Status
- Due Date
- Category
- Notes

Tasks can be edited as business priorities change.

### CEO Dashboard

Use the CEO Dashboard every morning.

Review:

- Today's priorities
- This week's priorities
- This month's priorities
- Done items
- Client follow-ups
- Money tasks
- Content and marketing tasks

Keep this practical. It is designed for action, not decoration.

### Appointments

Use Appointments to track consultations, updates, cancellations, and reschedules.

When Azure email queue settings are configured, appointment notifications should queue and send to:

- `aidamorales2014@gmail.com`
- `michaelcocom@yahoo.com`

### Notification History

Use Notification History to confirm whether emails were:

- Queued
- Sent
- Failed
- Retried

This helps owners confirm that booking and follow-up notifications are working.

### Documents and Signing

Use Documents for consulting agreements, NDAs, statements of work, proposals, change orders, and welcome packets.

Production rule:

Required documents should be signed before payment becomes available.

### Invoices

Use Invoices to build payment records with:

- Invoice number
- Client
- Service description
- Billable hours
- Hourly rate
- Flat fee
- Due date
- Payment status

Payment providers should process sensitive card or wallet data outside the CRM.

### Client Portal

The Client Portal is for clients to view:

- Progress
- Appointments
- Documents
- Invoices
- Messages
- Assessment items
- Uploads

Before using with real clients, connect production client authentication and storage.

## Daily Operating Rhythm

### Morning

1. Open CEO Dashboard.
2. Review today's top priorities.
3. Check overdue tasks.
4. Review upcoming appointments.
5. Check notifications.
6. Update each client's next action.

### During Client Work

1. Open the client record.
2. Update status and phase.
3. Add notes and tasks.
4. Update document and payment status.
5. Add the next action before leaving the record.

### End Of Day

1. Mark completed tasks.
2. Review open money tasks.
3. Check tomorrow's appointments.
4. Export or back up data if needed.

## What Not To Enter

Do not enter:

- Passwords
- Bank login credentials
- Credit card numbers
- Private API keys
- Personal secrets

Use provider dashboards for payments, e-signatures, banking, and authentication secrets.

## Production Launch Checklist

Before using with real clients:

- Confirm Aida and Michael can log in with Microsoft accounts.
- Confirm MFA is enabled.
- Confirm no unauthorized user can open Silverback HQ.
- Confirm appointment emails send to both owners.
- Confirm CRM opens with no sample records.
- Confirm the client portal authentication plan is active.
- Confirm backup process is documented.
