"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import IndividualTeam from "./_components/IndividualTeam";
import PodiumProfile from "./_components/PodiumProfile";
import TabSwitch from "./_components/TabSwitch";
import styles from "./rankings.module.css";

type Team = {
  _id: string;
  teamName: string;
  points: number;
  avatarKey?: string | null;
  avatarUrl?: string | null;
};

type Submission = {
  _id: string;
  eventName: string;
  date: string;
  pointAllocation: Array<{
    team: string | { _id: string };
    points: number;
  }>;
};

const getTeamId = (team: string | { _id: string }) => (typeof team === "string" ? team : team._id);

export default function RankingsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRankings() {
      const teamsResponse = await fetch("/api/teams/");
      const submissionsResponse = await fetch("/api/submissions/");

      const teamsData = (await teamsResponse.json()) as Team[];
      const submissionsData = (await submissionsResponse.json()) as Submission[];

      setTeams(teamsData);
      setSubmissions(submissionsData);
    }

    void fetchRankings();
  }, []);

  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
  const topThree = sortedTeams.slice(0, 3);
  const runnerUp = sortedTeams.slice(3);
  const podiumTeams = topThree.length === 3 ? [topThree[1], topThree[0], topThree[2]] : topThree;

  const getRecentSubmission = (teamId: string) => {
    const match = submissions
      .filter((submission) =>
        submission.pointAllocation.some((allocation) => getTeamId(allocation.team) === teamId),
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    if (!match) return null;

    const allocation = match.pointAllocation.find((item) => getTeamId(item.team) === teamId);

    return {
      eventName: match.eventName,
      points: allocation?.points ?? 0,
      date: match.date,
    };
  };

  return (
    <main className={styles.leaderboardContainer}>
      <TabSwitch activeTab="ranks" onTabSwitch={(tab) => console.info(tab)} />

      <div className={styles.topThree}>
        {podiumTeams.map((team) => {
          const rank = team === topThree[0] ? 1 : team === topThree[1] ? 2 : 3;

          return (
            <PodiumProfile
              key={team._id}
              rank={rank}
              points={team.points}
              name={team.teamName}
              imageSrc={team.avatarUrl || "/eshaan-profile.jpg"}
            />
          );
        })}
      </div>

      <div className={styles.leaderboard}>
        <h2 className={styles.mainLabel}>Top 3 Teams</h2>

        {topThree.map((team, index) => (
          <IndividualTeam
            key={team._id}
            rank={index + 1}
            name={team.teamName}
            points={team.points}
            containerStyle={
              index === 0 ? styles.firstPlace : index === 1 ? styles.secondPlace : styles.thirdPlace
            }
            isExpanded={expandedTeamId === team._id}
            recentSubmission={getRecentSubmission(team._id)}
            onClick={() => setExpandedTeamId((current) => (current === team._id ? null : team._id))}
          />
        ))}

        <h2 className={styles.mainLabel}>Runner Ups</h2>

        {runnerUp.map((team, index) => (
          <IndividualTeam
            key={team._id}
            rank={index + 4}
            name={team.teamName}
            points={team.points}
            isExpanded={expandedTeamId === team._id}
            recentSubmission={getRecentSubmission(team._id)}
            onClick={() => setExpandedTeamId((current) => (current === team._id ? null : team._id))}
          />
        ))}
      </div>

      <Link className={styles.submitButton} href="/submit/select" aria-label="Submit social points">
        <span className={styles.submitPlus}>+</span>
      </Link>
    </main>
  );
}
