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

- Silverback HQ local preview: `SILVERBACK`
- Client Portal local preview: `CLIENT2026`

These are local preview codes only. In Azure, Silverback HQ is protected by Microsoft Entra ID through `staticwebapp.config.json`.

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
- `SILVERBACK_NOTIFICATION_RECIPIENTS=aidamorales2014@gmail.com,michaelcocom@yahoo.com`
- `ACS_CONNECTION_STRING`
- `ACS_SENDER_ADDRESS`
- `EMAIL_QUEUE_NAME=silverback-email-notifications`
- `REMINDER_OFFSET_HOURS=24`

## Live-Readiness Notes

Before collecting real client data, complete:

- `SILVERBACK_ENTRA_ID_SETUP.md`
- `SECURITY_CONFIGURATION.md`
- `PRODUCTION_DEPLOYMENT_GUIDE.md`
- `DEPLOYMENT_READINESS_CHECKLIST.md`
- `FIRST_DAY_OWNER_GUIDE.md`
- `SILVERBACK_CRM_USER_MANUAL.md`

These guides cover owner authentication, backend data storage, email delivery, Azure Queue Storage, Azure Communication Services, payment providers, e-signature providers, and first-day CRM use.
