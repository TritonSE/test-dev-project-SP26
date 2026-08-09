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
// import { Colors } from "@/src/constants/colors";

import { Rubik } from "next/font/google";
import Image from "next/image";

import styles from "./leaderboard.module.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  variable: "--rubik",
});

export default function LeaderboardPage() {
  return (
    <main className={`${styles.teamContainer} ${rubik.variable}`}>
      <h1 className={styles.title}>
        <span className={styles.bold}>TEST</span> in the lead🥳
      </h1>
      {/* TODO: Replace with real team data from API */}
      <h2 className={styles.points}>100</h2>
      <Image
        src="/eshaan-profile.jpg"
        alt="Headshot of Eshaan"
        width={371}
        height={366}
        className={styles.profilePicture}
      ></Image>

      <h3 className={styles.rank}>
        <span className={styles.rankNum}>1st</span> Place
      </h3>
    </main>
  );
}
