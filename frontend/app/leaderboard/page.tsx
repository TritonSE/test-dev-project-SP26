// =============================================================================
// SCREEN: Live Leaderboard  (/leaderboard)
// =============================================================================
// PURPOSE: Public-facing page showing live team point standings.
//
// WHAT TO BUILD HERE:
//   - Fetch all teams + their approved point totals from GET /api/teams
//   - Display teams ranked by points (highest first)
//   - Show team name + total points for each team
//   - Auto-refresh or use polling so scores update without page reload
//   - Mobile-first layout (this is the main screen members will see)
//
// DATA NEEDED FROM BACKEND:
//   GET /api/teams  →  [{ id, name, points, rank }]
//
// NOTES:
//   - Only approved submissions count toward points (flagged ones excluded)
//   - See project scope doc for full list of teams
// =============================================================================

export default function LeaderboardPage() {
  return (
    <main>
      <h1>Leaderboard</h1>
      {/* TODO: Replace with real team data from API */}
      <p>Team standings will appear here.</p>
    </main>
  );
}
