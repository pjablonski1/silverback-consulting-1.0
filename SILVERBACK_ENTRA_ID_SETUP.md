# Silverback Entra ID Setup

Use this guide before Aida or Michael use Silverback HQ with real client data.

## Owner Accounts

Create or invite these users in Microsoft Entra ID:

- Aida Morales: `aidamorales2014@gmail.com`
- Michael Cocom: `michaelcocom@yahoo.com`

Both should be assigned the same Owner/Admin access.

## Required Security

- Require password reset at first login.
- Require MFA for both owners.
- Disable legacy authentication.
- Use conditional access if available.
- Review sign-in logs after the first login.

## Azure Static Web Apps Authentication

Silverback HQ is protected in `staticwebapp.config.json` with:

- `/crm.html`
- Role: `authenticated`

That means the live CRM should require Microsoft login before the page loads.

## Recommended Roles

Start with these role names for future expansion:

- Owner
- Advisor
- Client
- Investor

For the first release, Aida and Michael should both have Owner/Admin access.

## Client Portal Note

The client portal currently supports local preview access and production-ready screens. Before real client use, connect the client portal to Azure External ID or another secure client authentication provider.
