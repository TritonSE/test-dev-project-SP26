"use client";
import teamChipStyles from "../styles/teamChip.module.css";

import TeamChip from "./TeamChip";

type Team = {
  id: string;
  name: string;
};

type Props = {
  teams: Team[];
};

export default function TeamsHosting({ teams }: Props) {
  const featuredTeams = ["dbc", "homestart"]
    .map((teamId) => teams.find((team) => team.id === teamId))
    .filter((team): team is Team => Boolean(team));

  return (
    <div
      style={{
        width: "402px",
        paddingTop: "13px",
        paddingRight: "30px",
        paddingLeft: "34px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        opacity: 1,
        fontFamily: "Rubik, sans-serif",
        fontWeight: 500,
      }}
    >
      <h2
        style={{
          width: "335px",
          height: "18px",
          margin: "0",
          fontSize: "15px",
          fontWeight: 500,
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#0C2B35",
        }}
      >
        Teams Hosting
      </h2>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {teams.map((team) => (
          <TeamChip key={team.id} team={team} />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <p
          style={{
            width: "308px",
            height: "24px",
            margin: "0",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontStyle: "normal",
            fontSize: "10px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#8FA7B0",
            opacity: 1,
          }}
        >
          If teams are missing, go back and tag people from those teams. Points will be split by
          headcount.
        </p>
      </div>

      <div style={{ padding: "5px 0" }}>
        <hr style={{ margin: "0", border: "none", borderTop: `1px solid #8FA7B0` }} />
      </div>

      <div
        style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}
      >
        {featuredTeams.map((team) => (
          <div
            key={team.id}
            style={{
              width: "331px",
              height: "31px",
              display: "flex",
              alignItems: "center",
              gap: "159px",
              opacity: 1,
              transform: "rotate(0deg)",
            }}
          >
            <TeamChip team={team} />
            <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <div
                className={[
                  teamChipStyles.scoreBubble,
                  team.id === "dbc"
                    ? teamChipStyles.dbcScore
                    : team.id === "f3"
                      ? teamChipStyles.f3Score
                      : team.id === "homestart"
                        ? teamChipStyles.homestartScore
                        : team.id === "test"
                          ? teamChipStyles.testScore
                          : teamChipStyles.pvpScore,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {team.id === "dbc" ? 1 : 2}
              </div>
              <span
                style={{
                  width: "46px",
                  height: "12px",
                  fontFamily: "Rubik, sans-serif",
                  fontWeight: 500,
                  fontStyle: "normal",
                  fontSize: "10px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#8FA7B0",
                  opacity: 1,
                  transform: "rotate(0deg)",
                }}
              >
                members
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "5px 0" }}>
        <hr style={{ margin: "0", border: "none", borderTop: `1px solid #8FA7B0` }} />
      </div>
    </div>
  );
}
