"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "../history.module.css";

import HistorySocialPopup from "./HistorySocialPopup";
import HistoryWeeklyRankingPopup from "./HistoryWeeklyRankingPopup";

type Submission = {
  _id: string;
  eventName: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  photoUrls?: string[];
  pointAllocation: { team: { teamName: string } | string; points: number }[];
};

// What GET /api/rankings returns (see backend/src/models/Rankings.ts)
type Ranking = {
  _id: string;
  message: string;
  createdAt: string;
};

// What GET /api/teams returns (see backend/src/models/Team.ts)
type Team = {
  _id: string;
  teamName: string;
  points: number;
};

// One item in the feed: a social alert or a ranking alert
type Alert =
  | { type: "social"; id: string; date: Date; submission: Submission }
  | { type: "ranking"; id: string; date: Date; message: string };

// Track which popup is open, and the data it needs
type OpenPopup =
  { type: "social"; submission: Submission } | { type: "weeklyRanking"; weekRange: string } | null;

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const SOCIAL_ICON_SIZE = 20;
const RANKING_ICON_SIZE = 30;

// Splits "TEST is now in 1st Place!" into ["TEST", " is now in ", "1st", " Place!"]
const PLACEMENT_PATTERN = /^(.+?)( is now (?:in )?)(\d+(?:st|nd|rd|th))(.*)$/i;

// Sunday 00:00 of the week the date is in (weeks run Sunday-Saturday)
function startOfWeek(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

// Format day and month as "19 Apr"
function formatDayMonth(date: Date) {
  return `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`;
}

// Format month and day as "04/25"
function formatMonthDay(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}`;
}

function getTotalPoints(submission: Submission) {
  return submission.pointAllocation.reduce((sum, p) => sum + p.points, 0);
}

function getTeamNames(submission: Submission, teams: Team[]) {
  return submission.pointAllocation
    .map((p) => {
      if (typeof p.team !== "string") return p.team.teamName;
      return teams.find((t) => t._id === p.team)?.teamName ?? "Unknown team";
    })
    .join(", ");
}

export default function HistoryTab() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [openPopup, setOpenPopup] = useState<OpenPopup>(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        const [submissionsRes, rankingsRes, teamsRes] = await Promise.all([
          fetch("/api/submissions"),
          fetch("/api/rankings"),
          fetch("/api/teams"),
        ]);
        if (!submissionsRes.ok || !rankingsRes.ok || !teamsRes.ok) {
          throw new Error("Failed to fetch history");
        }
        setSubmissions((await submissionsRes.json()) as Submission[]);
        setRankings((await rankingsRes.json()) as Ranking[]);
        setTeams((await teamsRes.json()) as Team[]);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    }

    void loadHistory();

    // Check for new alerts every 30 seconds. The old feed stays on screen
    // while loading, so new alerts just appear without the page flashing.
    const interval = setInterval(() => void loadHistory(), 30000);
    return () => clearInterval(interval);
  }, []);

  const approvedSubmissions = submissions.filter((s) => s.status === "approved");

  // Put social alerts and ranking alerts into one list, newest first
  const alerts: Alert[] = [
    ...approvedSubmissions.map((s): Alert => ({
      type: "social",
      id: s._id,
      date: new Date(s.date),
      submission: s,
    })),
    ...rankings.map((r): Alert => ({
      type: "ranking",
      id: r._id,
      date: new Date(r.createdAt),
      message: r.message,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  // Group the alerts by week
  const weeks: { start: Date; alerts: Alert[] }[] = [];
  for (const alert of alerts) {
    const start = startOfWeek(alert.date);
    const lastWeek = weeks[weeks.length - 1];

    if (lastWeek && lastWeek.start.getTime() === start.getTime()) {
      lastWeek.alerts.push(alert);
    } else {
      weeks.push({ start, alerts: [alert] });
    }
  }

  // Numbers for the "This Month" card
  const now = new Date();
  const socialsThisMonth = approvedSubmissions.filter((s) => {
    const date = new Date(s.date);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });
  const pointsThisMonth = socialsThisMonth.reduce((sum, s) => sum + getTotalPoints(s), 0);

  const thisWeekStart = startOfWeek(now).getTime();

  // Teams from most to fewest points, for the weekly ranking popup
  const standings = [...teams]
    .sort((a, b) => b.points - a.points)
    .map((team) => ({ id: team._id, name: team.teamName }));

  return (
    <div className={styles.history}>
      <div className={`${styles.card} ${styles.monthCard}`}>
        <h2 className={styles.monthTitle}>This Month</h2>

        {socialsThisMonth.length > 0 && (
          <div className={styles.monthStats}>
            <div className={styles.monthStat}>
              <span className={styles.monthNumber}>+{socialsThisMonth.length}</span>
              <span className={styles.monthLabel}>New Socials</span>
            </div>

            {pointsThisMonth > 0 && (
              <div className={styles.monthStat}>
                <span className={`${styles.monthNumber} ${styles.monthPoints}`}>
                  +{pointsThisMonth}
                </span>
                <span className={styles.monthLabel}>Social Points</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.card}>
        {weeks.length === 0 && <p className={styles.emptyText}>No history yet.</p>}

        {weeks.map((week) => {
          const end = new Date(week.start);
          end.setDate(end.getDate() + 6);
          const range = `${formatDayMonth(week.start)}-${formatDayMonth(end)}`;

          const weeksAgo = Math.round((thisWeekStart - week.start.getTime()) / WEEK_MS);
          const title = weeksAgo === 0 ? "This Week" : weeksAgo === 1 ? "Last Week" : range;

          return (
            <div key={week.start.getTime()} className={styles.week}>
              <div className={styles.weekHeader}>
                <h2 className={styles.weekTitle}>{title}</h2>
                {title !== range && <span className={styles.weekRange}>{range}</span>}
              </div>

              {/* Keys are database ids, so React only adds new alerts instead of redrawing all of them */}
              {week.alerts.map((alert) => {
                if (alert.type === "social") {
                  return (
                    <button
                      key={alert.id}
                      type="button"
                      className={`${styles.alert} ${styles.clickable}`}
                      onClick={() => setOpenPopup({ type: "social", submission: alert.submission })}
                    >
                      <span className={`${styles.alertIcon} ${styles.socialIcon}`}>
                        <Image
                          src="/social-icon.svg"
                          alt=""
                          width={SOCIAL_ICON_SIZE}
                          height={SOCIAL_ICON_SIZE}
                        />
                      </span>

                      <span className={styles.alertText}>
                        <strong>New Social Alert:</strong>
                        <br />
                        {getTeamNames(alert.submission, teams)}&apos;s {alert.submission.eventName}.
                        <br />+{getTotalPoints(alert.submission)} points.
                      </span>

                      <span className={styles.alertDate}>{formatMonthDay(alert.date)}</span>
                    </button>
                  );
                }

                const match = PLACEMENT_PATTERN.exec(alert.message);

                // "View this week's rankings!" opens the weekly ranking popup
                if (!match) {
                  return (
                    <button
                      key={alert.id}
                      type="button"
                      className={`${styles.alert} ${styles.clickable}`}
                      onClick={() => setOpenPopup({ type: "weeklyRanking", weekRange: range })}
                    >
                      <span className={styles.alertIcon}>
                        <Image
                          src="/week-ranking-icon.svg"
                          alt=""
                          width={RANKING_ICON_SIZE}
                          height={RANKING_ICON_SIZE}
                        />
                      </span>

                      <span className={styles.alertText}>{alert.message}</span>

                      <span className={styles.alertDate}>{formatMonthDay(alert.date)}</span>
                    </button>
                  );
                }

                return (
                  <div key={alert.id} className={styles.alert}>
                    <span className={styles.alertIcon}>
                      <Image
                        src="/trophy-icon.svg"
                        alt=""
                        width={RANKING_ICON_SIZE}
                        height={RANKING_ICON_SIZE}
                      />
                    </span>

                    <p className={styles.alertText}>
                      <strong>{match[1]}</strong>
                      {match[2]}
                      <strong>{match[3]}</strong>
                      {match[4]}
                    </p>

                    <p className={styles.alertDate}>{formatMonthDay(alert.date)}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {openPopup?.type === "social" && (
        <HistorySocialPopup
          eventName={openPopup.submission.eventName}
          photoUrls={openPopup.submission.photoUrls ?? []}
          onClose={() => setOpenPopup(null)}
        />
      )}

      {openPopup?.type === "weeklyRanking" && (
        <HistoryWeeklyRankingPopup
          weekRange={openPopup.weekRange}
          standings={standings}
          onClose={() => setOpenPopup(null)}
        />
      )}
    </div>
  );
}
