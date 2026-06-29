# Silverback Entra ID Setup

Use this guide before Aida or Michael use Silverback HQ with real client data.

## Owner Accounts

Create or invite these users in Microsoft Entra ID:

- Aida Morales: `aidamorales2014@gmail.com`
- Michael Cocom: `michaelcocom@yahoo.com`
- Patrick Jablonski / Pat In The Cloud: `patinthecloud@yahoo.com`

Aida and Michael should be assigned owner/admin access. Patrick should be assigned full technical administrator access for deployment, CRM support, portal support, integrations, troubleshooting, and emergency recovery.

## Required Security

- Require password reset at first login.
- Require MFA for both owners.
- Require MFA for the technology administrator account.
- Disable legacy authentication.
- Use conditional access if available.
- Review sign-in logs after the first login.

## Azure Static Web Apps Authentication

Silverback HQ is protected in `staticwebapp.config.json` with:

- `/crm.html`
- `/crm.js`
- `/crm.css`
- Roles: `silverback_admin`, `silverback_tech_admin`

That means the live CRM requires Microsoft login and an approved Silverback role before the CRM page or its private CRM files load.

## Azure Static Web Apps Role Invitations

In the Azure Static Web App:

1. Open the Static Web App resource.
2. Go to **Settings**.
3. Open **Role management** or **Authentication / authorization**.
4. Invite these accounts:
   - `aidamorales2014@gmail.com` with role `silverback_admin`
   - `michaelcocom@yahoo.com` with role `silverback_admin`
   - `patinthecloud@yahoo.com` with role `silverback_tech_admin`
5. Have each person accept the invitation.
6. Confirm each person can sign in and open `/crm.html`.
7. Confirm a non-invited account cannot open `/crm.html`.

## Recommended Roles

Start with these role names for future expansion:

- Owner
- Advisor
- Client
- Investor
- Tech Admin

For the first release, Aida and Michael should both have `silverback_admin` access. Patrick should have `silverback_tech_admin` access.

## Client Portal Note

The client portal currently supports local preview access and production-ready screens. Before real client use, connect the client portal to Azure External ID or another secure client authentication provider.
