# Silverback Consulting LLC Website

Static website and operating portal package for Silverback Consulting LLC.

## Included

- Public marketing website
- Investor intake popup
- Consultation scheduling popup
- AI assistant
- Silverback HQ CRM
- Client portal
- Azure-ready appointment email queue with notification history
- Privacy, Terms, Accessibility, 404, robots, and Azure Static Web Apps config

## Temporary Access

- Silverback HQ: `SILVERBACK`
- Client Portal: `CLIENT2026`

These are temporary access codes. Replace with real authentication before live client use.

## Local Preview

Open `index.html` in a browser from this folder.

## Azure Static Web Apps

Recommended Azure settings:

- App location: `/`
- API location: `api`
- Output location: leave blank
- Build command: leave blank

The site includes `staticwebapp.config.json` for routing, cache behavior, security headers, and the custom 404 page.

## Appointment Email Queue

The `api` folder contains Azure Functions for appointment notifications:

- `POST /api/appointments/notify` queues booking, update, cancellation, reschedule, and reminder events.
- `emailQueueProcessor` sends queued messages through Azure Communication Services.
- Notification history is visible inside Silverback HQ under Automation Center.

Set these Azure App Settings before production email is enabled:

- `AzureWebJobsStorage`
- `SILVERBACK_NOTIFICATION_RECIPIENTS=aidamorales2014@yahoo.com,cocommichael@yahoo.com`
- `ACS_CONNECTION_STRING`
- `ACS_SENDER_ADDRESS`
- `EMAIL_QUEUE_NAME=silverback-email-notifications`
- `REMINDER_OFFSET_HOURS=24`

## Live-Readiness Notes

Before collecting real client data, connect:

- Real authentication
- Backend data storage
- Email delivery service
- Azure Queue Storage and Azure Communication Services sender verification
- Payment provider
- E-signature provider
- Production privacy/terms review
