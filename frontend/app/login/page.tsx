// =============================================================================
// SCREEN: Authentication  (/login)
// =============================================================================
// PURPOSE: Gate access to submission form behind a club invite code.
//
// WHAT TO BUILD HERE:
//   - Input field for the club-wide invite code
//   - Dropdown to select your name from the member list
//   - Dropdown to select your team
//   - Submit button that validates the code via POST /api/auth/login
//   - On success: save auth token (localStorage or cookie) + redirect to /submit
//   - On failure: show an error message
//
// DATA NEEDED FROM BACKEND:
//   POST /api/auth/login  →  body: { inviteCode, memberId, teamId }
//                         ←  { token } or error
//   GET  /api/members     →  [{ id, name, teamId }]
//   GET  /api/teams       →  [{ id, name }]
//
// NOTES:
//   - Mobile view only (no need to optimize for desktop)
//   - The invite code is club-wide (one code for all members)
// =============================================================================

export default function LoginPage() {
  return (
    <main>
      <h1>Join TSE Social Points</h1>
      {/* TODO: Add invite code input */}
      {/* TODO: Add member name dropdown (fetched from API) */}
      {/* TODO: Add team dropdown (fetched from API) */}
      {/* TODO: Add submit button + auth logic */}
      <p>Login form goes here.</p>
    </main>
  );
}
