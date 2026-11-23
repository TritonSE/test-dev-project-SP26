"use client";

import { useEffect, useState } from "react";

import styles from "../admin.module.css";

type TeamColor = "blue" | "gold" | "green" | "yellow" | "purple" | "teal" | "orange" | "pink";

type Team = {
  _id: string;
  teamName: string;
  points: number;
};

type Member = {
  name: string;
  team: string | { _id: string };
};

const teamColors: Record<string, TeamColor> = {
  TEST: "green",
  "Simplified PLC": "gold",
  Homestart: "teal",
  PVP: "pink",
  "Tecate Horse Rescue": "purple",
  "International Health Collective": "yellow",
  "Sharia's Closet": "orange",
  "Banyan Roots": "blue",
};

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [membersByTeam, setMembersByTeam] = useState<Map<string, string[]>>(new Map());
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [draftPoints, setDraftPoints] = useState("");
  const [savingTeamId, setSavingTeamId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadTeamsAndMembers() {
      try {
        const [teamsResponse, membersResponse] = await Promise.all([
          fetch("/api/teams", { signal: controller.signal }),
          fetch("/api/members", { signal: controller.signal }),
        ]);

        if (!teamsResponse.ok) {
          throw new Error(`Could not load teams (${teamsResponse.status}).`);
        }
        if (!membersResponse.ok) {
          throw new Error(`Could not load members (${membersResponse.status}).`);
        }

        const [teamData, memberData] = await Promise.all([
          teamsResponse.json() as Promise<Team[]>,
          membersResponse.json() as Promise<Member[]>,
        ]);
        const nextMembersByTeam = new Map<string, string[]>();

        memberData.forEach((member) => {
          const teamId = typeof member.team === "string" ? member.team : member.team._id;
          const teamMembers = nextMembersByTeam.get(teamId) ?? [];
          teamMembers.push(member.name);
          nextMembersByTeam.set(teamId, teamMembers);
        });

        setTeams(teamData);
        setMembersByTeam(nextMembersByTeam);
      } catch (loadError) {
        if (loadError instanceof Error && loadError.name === "AbortError") {
          return;
        }
        setError(loadError instanceof Error ? loadError.message : "Could not load teams.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadTeamsAndMembers();

    return () => controller.abort();
  }, []);

  async function savePoints(team: Team) {
    const points = Number(draftPoints);
    if (!Number.isInteger(points) || points < 0) {
      setError("Enter a non-negative whole number of points.");
      return;
    }

    setError("");
    setSavingTeamId(team._id);

    try {
      const response = await fetch(`/api/teams/${encodeURIComponent(team._id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points }),
      });

      if (!response.ok) {
        throw new Error(`Could not update ${team.teamName} points (${response.status}).`);
      }

      const updatedTeam = (await response.json()) as Team;
      setTeams((currentTeams) =>
        currentTeams.map((currentTeam) =>
          currentTeam._id === updatedTeam._id ? updatedTeam : currentTeam,
        ),
      );
      setEditingTeamId(null);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save team points.");
    } finally {
      setSavingTeamId(null);
    }
  }

  return (
    <section className={styles.section} aria-labelledby="teams-heading">
      <div className={styles.sectionHeading}>
        <div className={styles.sectionTitle}>
          <h2 id="teams-heading">Teams</h2>
          <span className={styles.count}>{teams.length} teams</span>
        </div>
        <span className={styles.sectionNote}>
          Approved points only · Pending submissions are not included
        </span>
      </div>

      {error && <p className={styles.teamsError} role="alert">{error}</p>}
      {loading ? (
        <p className={styles.teamsMessage}>Loading teams…</p>
      ) : teams.length === 0 && !error ? (
        <p className={styles.teamsMessage}>No teams found.</p>
      ) : (
        <div className={styles.teamGrid}>
          {teams.map((team) => {
            const isEditing = editingTeamId === team._id;
            const isSaving = savingTeamId === team._id;
            const members = membersByTeam.get(team._id) ?? [];
            const color = teamColors[team.teamName] ?? "blue";

            return (
              <article className={styles.teamCard} key={team._id}>
                <div className={`${styles.teamAccent} ${styles[color]}`} />
                <div className={styles.teamInfo}>
                  <div className={styles.teamTitle}>
                    <h3>{team.teamName}</h3>
                    <p>
                      <strong>{team.points}</strong> <span>pts</span>
                    </p>
                  </div>
                  <h4>Members</h4>
                  <p className={styles.memberNames}>
                    {members.length ? members.join(", ") : "No members assigned"}
                  </p>
                </div>
                <div className={styles.teamFooter}>
                  {isEditing ? (
                    <form
                      className={styles.teamEditForm}
                      onSubmit={(event) => {
                        event.preventDefault();
                        void savePoints(team);
                      }}
                    >
                      <label className={styles.pointsInputLabel} htmlFor={`points-${team._id}`}>
                        <span className={styles.visuallyHidden}>
                          Total points for {team.teamName}
                        </span>
                        <input
                          id={`points-${team._id}`}
                          className={styles.pointsInput}
                          type="number"
                          min="0"
                          step="1"
                          required
                          value={draftPoints}
                          onChange={(event) => setDraftPoints(event.target.value)}
                          disabled={isSaving}
                        />
                      </label>
                      <div className={styles.teamEditActions}>
                        <button className={styles.savePointsButton} type="submit" disabled={isSaving}>
                          {isSaving ? "Saving…" : "Save"}
                        </button>
                        <button
                          className={styles.cancelEditButton}
                          type="button"
                          onClick={() => setEditingTeamId(null)}
                          disabled={isSaving}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <span>Total points</span>
                      <button
                        type="button"
                        disabled={savingTeamId !== null}
                        onClick={() => {
                          setDraftPoints(String(team.points));
                          setEditingTeamId(team._id);
                          setError("");
                        }}
                      >
                        Edit points
                      </button>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
