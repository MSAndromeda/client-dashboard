# Client Follow-up — Minimal Prototype

Purpose  
Quick, non‑technical prototype to show basic follow‑up workflow so stakeholder can approve core UI before details.

Must-have features

- Client list showing Next Action + Last Contacted + Owner
- Open client drawer to view history and add a follow‑up (type, date/time, owner)
- Search + simple filters: All / Overdue / Today / Upcoming
- Quick contact buttons (Call, Email) and reminder toggle

Minimal layout

- Top bar: title, filter chips, search
- Main: table/list (Client, Contact, Last Contacted, Next Action, Owner, Priority)
- Right drawer/modal: overview, recent notes, add follow‑up

Minimal data fields

- Client name, Contact (phone/email), Last Contacted, Next Action (type + date), Owner, Priority

Example sample rows

- Acme Corp — John Doe — Last: 2025-08-01 — Next: Call 2025-08-21 — Owner: Priya
- Beta LLC — Sarah Li — Last: 2025-07-28 — Next: Email 2025-08-19 — Owner: Raj

Core user flows

- Search → open client → add follow‑up → save (reminder set)
- Filter Overdue → open rows → mark done

Acceptance (ask stakeholder to confirm)

- Can view clients with next actions and add follow‑ups with date/owner
- Filters/search work for expected rows

Next steps

- Build List + Client drawer with 6 sample entries; demo and capture feedback.
