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

Use Microsoft Entra ID for owner access. Silverback HQ is already configured to require authenticated users in Azure.

## 5. First Verification

After deployment:

1. Open the public website.
2. Submit a test consultation request.
3. Confirm the email event is queued.
4. Confirm Aida and Michael receive the notification.
5. Open Silverback HQ.
6. Confirm unauthenticated users are blocked.
7. Confirm the CRM opens clean with no sample client records.

## 6. Custom Domain

For `www.sbpnetwork.com`, keep the Azure-provided CNAME value in Squarespace DNS until Azure validates the custom domain.

Do not delete existing email security records.
