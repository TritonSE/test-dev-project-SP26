"use client";

import Image from "next/image";

import teamChipStyles from "../styles/teamChip.module.css";

import TeamChip from "./TeamChip";

type Team = {
  id: string;
  name: string;
  members?: number;
};

type Props = {
  teams: Team[];
  onNext?: () => void;
};

export default function PointAllocation({ teams, onNext }: Props) {
  const teamById = Object.fromEntries(teams.map((team) => [team.id, team]));
  const teamPairs: [Team, Team | undefined][] = [];

  if (teamById.dbc && teamById.pvp) {
    teamPairs.push([teamById.dbc, teamById.pvp]);
  } else if (teamById.dbc) {
    teamPairs.push([teamById.dbc, undefined]);
  } else if (teamById.pvp) {
    teamPairs.push([teamById.pvp, undefined]);
  }

  if (teamById.homestart) {
    teamPairs.push([teamById.homestart, undefined]);
  }

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
      }}
    >
      <h2
        style={{
          width: "115px",
          height: "18px",
          margin: "0",
          fontFamily: "Rubik, sans-serif",
          fontSize: "15px",
          fontWeight: 500,
          fontStyle: "normal",
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#0C2B35",
          opacity: 1,
          transform: "rotate(0deg)",
        }}
      >
        Point Allocation
      </h2>

      {/* Rows with team pairs and scores */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {teamPairs.map((pair, pairIndex) => (
          <div
            key={`pair-${pairIndex}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {/* First team chip */}
            <TeamChip team={pair[0]} />

            {/* Second team chip (if exists) */}
            {pair[1] && (
              <TeamChip team={pair[1]} />
            )}

            {/* Spacer */}
            <div style={{ flex: 1 }}></div>

            {/* 1+1 = label */}
            <span
              style={{
                fontFamily: "Rubik, sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                fontStyle: "normal",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#8FA7B0",
              }}
            >
              1+1 =
            </span>

            {/* Score bubble */}
            <div
              className={[
                teamChipStyles.scoreBubble,
                pair[0].id === "dbc"
                  ? teamChipStyles.dbcScore
                  : pair[0].id === "homestart"
                    ? teamChipStyles.homestartScore
                    : teamChipStyles.pvpScore,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              2
            </div>

            {/* pts label */}
            <span
              style={{
                fontFamily: "Rubik, sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                fontStyle: "normal",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#8FA7B0",
              }}
            >
              pts
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto", alignItems: "flex-end" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "8px",
            width: "fit-content",
          }}
        >
          <Image src="/img/flag.svg?v=original" alt="Flag" width={8} height={10} />
          <span
            style={{
              width: "75px",
              height: "15px",
              fontFamily: "Karla, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "150%",
              letterSpacing: "0%",
              color: "#B93B3B",
              opacity: 1,
              transform: "rotate(0deg)",
            }}
          >
            Status: Flagged
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          style={{
            width: "131px",
            height: "48px",
            padding: "6px 25px",
            borderRadius: "100px",
            background: "#0f3a47",
            color: "white",
            fontSize: "16px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            opacity: 1,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
