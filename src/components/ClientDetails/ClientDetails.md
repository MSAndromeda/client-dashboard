# Client Details — Prototype Spec

Purpose  
Provide a minimal, interactive client details page to show to stakeholders. Deliver a small, clean UI that demonstrates data layout, primary interactions (view → edit), and responsive behaviour. After approval, build enhanced features.

## Goals (MVP)

- Show core demographic & contact info at a glance
- Provide a clear Edit flow (readonly → inline edit/modal)
- Work on desktop and mobile widths
- Use mock data so front-end can be reviewed before backend integration

## Minimal fields (MVP)

- Client ID
- Full name
- Avatar / initials
- Age or DOB (display age)
- Sex / Gender
- Primary phone (click-to-call)
- Primary email (mailto)
- Primary address (one-line + city, state, postal)
- Status (Active / Inactive)
- Created / Last updated timestamps
- Short notes / summary (1–2 lines)

## Minimal layout (wireframe)

- Header card: Avatar, Name, Client ID, Status, Edit button
- Two-column body:
  - Left column: Demographic card (DOB, gender, language)
  - Right column: Contact card (phone, email, address), Quick actions (call, email, directions)
- Bottom: Notes / Summary block
- Mobile: single column, collapsible sections

## Interactions (MVP)

- Edit toggle: switch to editable fields, Save / Cancel
- Field validations: required name, valid email, phone format
- Loading & empty states (skeleton loader, “No data” message)
- Clickable phone/email/address
- Copy client ID button

## Data model (example)

```json
{
  "id": "CLI-000123",
  "firstName": "Jane",
  "lastName": "Doe",
  "dob": "1986-04-17",
  "gender": "Female",
  "phone": "+1-555-555-1212",
  "email": "jane.doe@example.com",
  "address": {
    "line": "123 Market St",
    "city": "San Francisco",
    "state": "CA",
    "postal": "94103"
  },
  "status": "Active",
  "createdAt": "2024-07-01T10:00:00Z",
  "updatedAt": "2025-01-15T14:30:00Z",
  "notes": "Prefers email contact. Follow-up in 3 months."
}
```

## Mock data for prototype

- Provide 3 client records: one complete, one missing address, one inactive — to demo empty states and status variations.

## Acceptance criteria (for demo)

- Page loads with mock client visible
- Edit mode works and updates UI (no backend needed)
- Mobile and desktop layout look acceptable
- Phone and email actions are clickable
- Basic validations show inline errors

## Enhanced features (Phase 2)

- Tabs: Activity timeline, Documents, Appointments, Billing
- Documents upload & preview
- Interaction timeline (calls, emails, notes)
- Merge duplicates, audit log
- Role-based visibility / permissions
- Export to PDF / Print layout
- Charts: demographics, recent activity
- Geolocation map for addresses
- Accessibility (WCAG), i18n support
- Offline caching / optimistic updates

## Implementation notes

- Use components: Avatar, Card, FieldRow, EditableField, Badge, ActionButton, Skeleton
- Keep a readonly view + edit form (modal or inline)
- Start with static JSON file; wire to API once approved
- Provide storybook stories for each state (default, loading, empty, error)

## Next steps

1. Build static prototype using mock JSON (1–2 days)
2. Review with stakeholder, gather feedback
3. Scope Phase 2 based on feedback
