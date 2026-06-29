# Azure Deployment Steps

1. Create a new GitHub repository.
2. Upload this full folder to the repository.
3. In Azure, create a Static Web App.
4. Connect the GitHub repository.
5. Use these build settings:

   - App location: `/`
   - API location: `api`
   - Output location: blank
   - Build preset: Custom

6. If Azure creates its own workflow file, use that generated file.
7. If using the workflow already included here, add the Azure deployment token as a GitHub repository secret named:

   `AZURE_STATIC_WEB_APPS_API_TOKEN`

8. Add Azure Static Web App application settings for the email queue:

   - `AzureWebJobsStorage`
   - `SILVERBACK_NOTIFICATION_RECIPIENTS`
   - `ACS_CONNECTION_STRING`
   - `ACS_SENDER_ADDRESS`
   - `EMAIL_QUEUE_NAME`
   - `REMINDER_OFFSET_HOURS`

9. After deployment, open the Azure URL and test:

   - Home page
   - Investor intake popup
   - Schedule consultation popup
   - Appointment notification history in Silverback HQ
   - AI assistant
   - Silverback HQ
   - Client portal
   - Privacy and Terms pages

10. Before real client use, connect real login, backend storage, email delivery, payment processing, and e-signature services.
