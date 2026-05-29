// =============================================================================
// SCREEN: Social Submission Form  (/submit)
// =============================================================================
// PURPOSE: Members use this to submit a social event for point tracking.
//
// WHAT TO BUILD HERE — the form has these fields:
//   1. Submission name        — text input (e.g. "Escape Room Night")
//   2. Activity type          — text input (e.g. "Escape Room")
//   3. Who attended           — multi-select dropdown of all members
//   4. Date & time            — date + time picker
//   5. Photo upload           — required, image of all members present
//   6. Point assignment       — submitter manually assigns points per team
//                               e.g. { "F3 Global": 3, "CRED": 2, "PVP": 1 }
//   7. PVP flag               — if PVP members attended, where do their points go?
//                               options: assign to a team | don't count
//                               if assigned to a team → auto-flagged for admin review
//
// VALIDATION RULES (block submission if violated):
//   - Fewer than 3 attendees → show error, do NOT submit
//   - Photo is required
//   - All fields must be filled
//
// AFTER SUBMIT:
//   - Show confirmation screen with point breakdown per team
//   - See /submit/confirmation for that screen
//
// DATA NEEDED FROM BACKEND:
//   GET  /api/members           →  [{ id, name, teamId }]
//   GET  /api/teams             →  [{ id, name }]
//   POST /api/submissions       →  body: FormData (all fields + photo)
//                               ←  { submissionId, pointPreview }
//
// NOTES:
//   - Mobile view only
//   - Requires auth — redirect to /login if no token found
// =============================================================================

import { useState } from "react";
import { ThemeProvider, Calendar } from "@tritonse/tse-constellation";

export default function SubmitPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Submit a Social</h1>
      {/* TODO: Field 1 — Submission name (text input) */}
      <h1>Create New Event</h1>
      <p>Fill out the details below to set up your event.</p>

      {/* Your form components will go here */}
      <form style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
        <div>
          <label htmlFor="title" style={{ display: "block", marginBottom: "0.5rem" }}>
            Event Title
          </label>
          <input type="text" id="title" name="title" style={{ width: "100%", padding: "0.5rem" }} />
        </div>
      </form>
      {/* TODO: Field 2 — Activity type (text input) */}
      {/* TODO: Field 3 — Who attended (multi-select dropdown, fetch from /api/members) */}
      {/* TODO: Field 4 — Date & time (date + time picker) */}
      <section className="form-field">
        <label>Event Date & Time</label>
        <Calendar selected={selectedDate} setSelected={setSelectedDate} />
      </section>
      {/* TODO: Field 5 — Photo upload (required) */}
      {/* TODO: Field 6 — Point assignment per team */}
      {/* TODO: Field 7 — PVP flag (if applicable) */}
      {/* TODO: Validate min 3 attendees before submit */}
      {/* TODO: POST to /api/submissions, then redirect to /submit/confirmation */}
      <p>Submission form goes here.</p>
    </main>
  );
}
