"use client";

import { useEffect, useState } from "react";

import styles from "../history.module.css";

import HistoryRankingAlert from "./HistoryRankingAlert";
import HistorySocialAlert from "./HistorySocialAlert";

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

// One item in the feed: a social alert or a ranking alert
type Alert =
  | { type: "social"; id: string; date: Date; submission: Submission }
  | { type: "ranking"; id: string; date: Date; message: string };

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// Sunday 00:00 of the week the date is in (weeks run Sunday-Saturday)
function startOfWeek(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

// "19 Apr"
function formatDayMonth(date: Date) {
  return `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`;
}

// "04/25"
function formatMonthDay(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}`;
}

function getTotalPoints(submission: Submission) {
  return submission.pointAllocation.reduce((sum, p) => sum + p.points, 0);
}

function getTeamNames(submission: Submission) {
  return submission.pointAllocation
    .map((p) => (typeof p.team === "string" ? "A team" : p.team.teamName))
    .join(", ");
}

export default function HistoryTab() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [rankings, setRankings] = useState<Ranking[]>([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const [submissionsRes, rankingsRes] = await Promise.all([
          fetch("/api/submissions"),
          fetch("/api/rankings"),
        ]);
        if (!submissionsRes.ok || !rankingsRes.ok) {
          throw new Error("Failed to fetch history");
        }
        setSubmissions((await submissionsRes.json()) as Submission[]);
        setRankings((await rankingsRes.json()) as Ranking[]);
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

  // 1. Put social alerts and ranking alerts into one list, newest first
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

  // 2. Group the alerts by week
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

  // 3. Hide weeks where no socials happened
  const weeksWithSocials = weeks.filter((week) =>
    week.alerts.some((alert) => alert.type === "social"),
  );

  // 4. Numbers for the "This Month" card
  const now = new Date();
  const socialsThisMonth = approvedSubmissions.filter((s) => {
    const date = new Date(s.date);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });
  const pointsThisMonth = socialsThisMonth.reduce((sum, s) => sum + getTotalPoints(s), 0);

  const thisWeekStart = startOfWeek(now).getTime();

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
        {weeksWithSocials.length === 0 && <p className={styles.emptyText}>No socials yet.</p>}

        {weeksWithSocials.map((week) => {
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

              {/* Keys are database ids, so React only adds new alerts instead of redrawing all */}
              {week.alerts.map((alert) =>
                alert.type === "social" ? (
                  <HistorySocialAlert
                    key={alert.id}
                    teams={getTeamNames(alert.submission)}
                    eventName={alert.submission.eventName}
                    points={getTotalPoints(alert.submission)}
                    date={formatMonthDay(alert.date)}
                    photoUrls={alert.submission.photoUrls ?? []}
                  />
                ) : (
                  <HistoryRankingAlert
                    key={alert.id}
                    message={alert.message}
                    date={formatMonthDay(alert.date)}
                  />
                ),
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
