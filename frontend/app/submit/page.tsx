import SubmissionForm from "../../src/components/SubmissionForm";
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

export default function SubmitPage() {
  return (
    <main>
      <SubmissionForm />
    </main>
  );
}
