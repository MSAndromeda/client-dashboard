# Client Acquisition Stats — Minimal Spec (prototype)

## Purpose

A minimal, note-taking style page for tracking client-acquisition notes and simple per-note metrics so a non-technical stakeholder can create and view notes and see basic stats.

## Goals

- Quickly create, edit, delete notes about client acquisition activities.
- See a list of notes with date, tags and a small metrics summary.
- Show a simple overall stats header (totals for the selected period).
- Keep UI minimal and easy to prototype.

## Users

- Non-technical product owner (primary).
- Developer building the prototype.

## Scope (prototype)

- Notes: create, edit, delete, list, search by title/tag, pin.
- Per-note optional metrics: new leads, meetings, conversions, source.
- Overall stats header: total leads, total conversions, conversion rate (derived).
- No authentication, no export, no long-term reporting.

## Data model (minimal)

Note

- id: string
- title: string
- body: string (multiline)
- tags: string[]
- pinned: boolean
- createdAt: ISO datetime
- updatedAt: ISO datetime
- metrics: { - newLeads: number (optional) - meetings: number (optional) - conversions: number (optional) - source: string (optional)
  }

## UI layout (single page)

- Header
  - Title: "Client Acquisition Notes"
  - Period selector (All / Last 7d / Last 30d)
  - Simple totals: Total leads • Total conversions • Conversion rate
- Main (two columns on wide screens, stacked on small screens)
  - Left column — Notes list
    - Search input
    - Tag filter (optional)
    - "New Note" button
    - List of notes (pinned on top): each row shows title, date, tags, small metrics summary (leads/conversions), actions (edit, delete, pin)
  - Right column — Note editor / viewer
    - If no note selected, show a placeholder with "Create a note"
    - Editor fields: Title, Tags (comma), Body (textarea), Metrics inputs (newLeads, meetings, conversions, source)
    - Actions: Save, Cancel, Delete (if existing)

## Interactions / behaviors

- Create: New Note → opens editor → Save → note added to list (pinned true if selected)
- Edit: Click note → populate editor → Save → update list
- Delete: Confirmation modal → remove note
- Pin: Toggle pin moves note to top of list
- Search: filters by title/body/tags live
- Tag filter: click a tag to list only matching notes
- Period selector: filters notes by createdAt and recalculates totals

## Simple derived calculations

- Total leads = sum(notes.metrics.newLeads) for selected period
- Total conversions = sum(notes.metrics.conversions)
- Conversion rate = total conversions / total leads (show "-" if leads = 0)

## API (mock / minimal)

- GET /api/notes?from=&to=&q=&tag=
- POST /api/notes
- PUT /api/notes/:id
- DELETE /api/notes/:id
  (For prototype use local state or mock API)

## Acceptance criteria

- User can create a note with title and body.
- Created note appears in the list immediately.
- User can edit and delete notes.
- Pinned notes appear at top.
- Period selector updates header totals based on notes' metrics.
- Search and tag filters work.

## Implementation tasks (minimal)

1. Create UI skeleton: header + two-column layout.
2. Implement local state store for notes (start with empty array).
3. Implement notes list with search/tag/pin/delete.
4. Implement note editor with validation (title required).
5. Implement header totals recalculation for selected period.
6. Add simple styles for readability; keep minimal.

## UX notes for stakeholder

- This is a prototype — focus on capturing notes and lightweight metrics.
- If they want charts or exports later, add after review.
- Ask whether metrics should be required or optional per note.

## File/Component suggestions

- ClientAquesitionStats.tsx (main)
- NoteList.tsx
- NoteEditor.tsx
- noteService.ts (mock API / local storage)

That's the minimal spec to build a working prototype and get feedback.
