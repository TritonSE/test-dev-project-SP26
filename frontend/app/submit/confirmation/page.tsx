// =============================================================================
// SCREEN: Submission Confirmation  (/submit/confirmation)
// =============================================================================
// PURPOSE: Shown after a successful social submission.
//
// WHAT TO BUILD HERE:
//   - "Submission received!" success message
//   - Summary of the submission (event name, date, attendees)
//   - Point preview breakdown per team
//     e.g. F3 Global +3 pts, CRED +2 pts
//   - Note if the submission is flagged for review (PVP manual assignment)
//   - Button to go back to the leaderboard
//
// DATA:
//   - Pass submissionId or pointPreview via route state / query params from /submit
//   - Or re-fetch from GET /api/submissions/:id
//
// NOTES:
//   - Mobile view only
// =============================================================================

export default function ConfirmationPage() {
  return (
    <main>
      <h1>Submission Received!</h1>
      {/* TODO: Show event name, date, attendee count */}
      {/* TODO: Show point breakdown per team */}
      {/* TODO: If flagged, show "Pending admin review" notice */}
      {/* TODO: Button → go back to /leaderboard */}
      <p>Confirmation details go here.</p>
    </main>
  );
}
