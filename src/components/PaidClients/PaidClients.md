# Paid Client — Prototype requirements

Purpose  
Provide a minimal frontend prototype that displays paid clients and their basic demographic details so stakeholders can approve layout & flows before building the full product.

## Essentials (MVP — show first)

- Page header: title ("Paid Clients"), brief description, total paid clients count
- Search box (global search by name / email / company)
- Simple table or card list with columns:
  - Client name (clickable)
  - Client ID
  - Company
  - Email / Phone
  - Plan / Subscription tier
  - Billing status (Paid / Overdue)
  - Start date / Renewal date
- Client detail panel (modal or right-side drawer) showing:
  - Full name, Client ID, photo/avatar
  - Contact info (email, phone)
  - Company, Job title, Industry
  - Location (city, state, country)
  - Demographics: age or age-range, gender (optional), segments/tags
  - Billing summary: plan, amount, billing cycle, last payment date
  - Actions: Edit, Send invoice, Message
- Basic interactions:
  - Click row → open details
  - Sort by name / renewal date / billing status
  - Simple filters: plan, billing status, location
  - Pagination or infinite scroll
- Mock data used so UI looks populated

## Enhanced (post-approval)

- Advanced filters and multi-select segments
- Bulk actions (email, export CSV, change plan)
- Inline editing in table
- Activity timeline and notes per client
- Charts: demographic breakdown (age, location, plan distribution)
- Last login / usage metrics and active seats
- Export/import CSV, audit logs, role-based permissions
- Real-time updates (websockets) and confirmations

## Layout / component suggestions

- Top bar: title + global actions (Add client, Export)
- Left: filter panel (collapsed on mobile)
- Main: table/list with responsive card view on small screens
- Right: details drawer (keeps user on list)
- Reusable components: Table, Card, Drawer/Modal, FilterControls, Pagination, SearchInput, Avatar

## Data model (minimal)

- id: string
- firstName, lastName
- email, phone
- company, jobTitle, industry
- location: { city, state, country }
- demographics: { age?: number, ageRange?: string, gender?: string, tags?: string[] }
- plan: { name, tier, amount, currency, billingCycle }
- billing: { status, lastPaymentDate, nextRenewalDate }
- metadata: { createdAt, updatedAt }

## Mock JSON example

[
{
"id": "C-1001",
"firstName": "Aisha",
"lastName": "Khan",
"email": "aisha@example.com",
"phone": "+1-555-0100",
"company": "Acme Co",
"jobTitle": "Product Manager",
"industry": "SaaS",
"location": {"city":"Austin","state":"TX","country":"USA"},
"demographics": {"ageRange":"30-39","gender":"Female","tags":["enterprise"]},
"plan": {"name":"Pro","tier":"Tier 2","amount":199,"currency":"USD","billingCycle":"Monthly"},
"billing": {"status":"Paid","lastPaymentDate":"2025-07-01","nextRenewalDate":"2025-08-01"}
},
{
"id": "C-1002",
"firstName": "Liam",
"lastName": "Ng",
"email": "liam@startup.io",
"phone": "+44-20-7000-0002",
"company": "Startup.io",
"jobTitle": "CTO",
"industry": "Fintech",
"location": {"city":"London","state":"","country":"UK"},
"demographics": {"ageRange":"25-29","gender":"Male","tags":["small-business"]},
"plan": {"name":"Basic","tier":"Tier 1","amount":49,"currency":"GBP","billingCycle":"Monthly"},
"billing": {"status":"Overdue","lastPaymentDate":"2025-05-15","nextRenewalDate":"2025-06-15"}
}
]

## Acceptance criteria for prototype

- List page loads with mock data
- User can search, sort, and open a client's details
- Details panel shows required demographic and billing fields
- Layout is responsive (table → cards on small screens)

## Notes

- Keep sensitive demographic fields optional and configurable (respect privacy)
- Start with mock data and stubbed endpoints; add real API later
- Prioritize clarity and quick interactions for stakeholder review

Provide this as the content of PaidClients.md so you can iterate after feedback.
