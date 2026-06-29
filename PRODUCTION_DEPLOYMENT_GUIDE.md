# Silverback Production Deployment Guide

## 1. Upload To GitHub

Upload the complete project folder contents to the repository root. Keep the file structure exactly as-is.

Do not upload:

- `.env`
- `local.settings.json`
- ZIP files
- Any file containing passwords or provider secrets

## 2. Azure Static Web Apps

Recommended settings:

- App location: `/`
- API location: `api`
- Output location: leave blank
- Branch: `main`
- Authorization: GitHub

## 3. Azure App Settings

Add values from `.env.example` into Azure App Settings.

At minimum for appointment notifications:

- `AzureWebJobsStorage`
- `EMAIL_QUEUE_NAME`
- `SILVERBACK_NOTIFICATION_RECIPIENTS`
- `ACS_CONNECTION_STRING`
- `ACS_SENDER_ADDRESS`
- `REMINDER_OFFSET_HOURS`

## 4. Authentication

Use Microsoft Entra ID / Azure Static Web Apps role invitations for owner and technology administrator access.

Silverback HQ is configured to require approved roles before the CRM loads:

- `silverback_admin`
- `silverback_tech_admin`

Invite these accounts before the CRM is used with real data:

- `aidamorales2014@gmail.com` as `silverback_admin`
- `michaelcocom@yahoo.com` as `silverback_admin`
- `patinthecloud@yahoo.com` as `silverback_tech_admin`

The local preview code is only for local machine review. Do not use local preview access as the production security model.

## 5. First Verification

After deployment:

1. Open the public website.
2. Submit a test consultation request.
3. Confirm the email event is queued.
4. Confirm Aida and Michael receive the notification.
5. Open Silverback HQ.
6. Confirm unauthenticated users are blocked.
7. Confirm non-invited users are blocked.
8. Confirm Aida, Michael, and the tech administrator can open Silverback HQ.
9. Confirm the CRM opens clean with no sample client records.

## 6. Custom Domain

For `www.sbpnetwork.com`, keep the Azure-provided CNAME value in Squarespace DNS until Azure validates the custom domain.

Do not delete existing email security records.
