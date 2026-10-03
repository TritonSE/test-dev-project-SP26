// =============================================================================
// SCREEN: Admin Panel  (/admin)
// =============================================================================
// PURPOSE: VP Operations / President review queue for flagged submissions.
//          Desktop-only view.
//
// WHAT TO BUILD HERE:
//   - Protected route — redirect if user is not an admin
//   - Queue of ALL submissions (most recent first)
//   - For each submission, admins can:
//       ✅ Approve  — points apply to leaderboard
//       ❌ Reject   — points withheld
//       ✏️  Adjust  — manually change point values before approving
//   - Team management section:
//       - List of teams with their members
//       - Ability to manually add/subtract points (for offenses or special cases)
//       - e.g. assign PVP points to a specific team for cross-team socials
//
// DATA NEEDED FROM BACKEND:
//   GET    /api/submissions          →  all submissions with status
//   PATCH  /api/submissions/:id      →  body: { status: "approved"|"rejected", points? }
//   GET    /api/teams                →  teams with members + point totals
//   POST   /api/teams/:id/points     →  body: { delta, reason } — manual point adjust
//
// NOTES:
//   - Desktop only (no mobile optimization needed)
//   - This is marked as V2 in scope — build the skeleton now, implement later
// =============================================================================

export default function AdminPage() {
  return (
    <main>
      <h1>Admin Panel</h1>
      {/* TODO: Check admin auth — redirect if not authorized */}
      {/* TODO: Section 1 — All submissions list with approve/reject/adjust */}
      {/* TODO: Section 2 — Team management + manual point adjustment */}
      <p>Admin review queue goes here.</p>
    </main>
  );
}
