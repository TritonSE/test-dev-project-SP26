"use client";

import Image from "next/image";

import teamChipStyles from "./teamChip.module.css";

import TeamChip from "./TeamChip";

import styles from "./pointAllocation.module.css";

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

  if (teamById.f3) {
    teamPairs.push([teamById.f3, undefined]);
  }

  if (teamById.homestart) {
    teamPairs.push([teamById.homestart, undefined]);
  }

  if (teamById.test) {
    teamPairs.push([teamById.test, undefined]);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Point Allocation</h2>

      {/* Rows with team pairs and scores */}
      <div className={styles.pairsList}>
        {teamPairs.map((pair, pairIndex) => (
          <div key={`pair-${pairIndex}`} className={styles.pairRow}>
            {/* First team chip */}
            <TeamChip team={pair[0]} />

            {/* Second team chip (if exists) */}
            {pair[1] && <TeamChip team={pair[1]} />}

            {/* Spacer */}
            <div className={styles.spacer}></div>

            {/* 1+1 = label */}
            <span className={styles.calcLabel}>1+1 =</span>

            {/* Score bubble */}
            <div
              className={[
                teamChipStyles.scoreBubble,
                pair[0].id === "dbc"
                  ? teamChipStyles.dbcScore
                  : pair[0].id === "f3"
                    ? teamChipStyles.f3Score
                    : pair[0].id === "homestart"
                      ? teamChipStyles.homestartScore
                      : pair[0].id === "test"
                        ? teamChipStyles.testScore
                        : teamChipStyles.pvpScore,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              2
            </div>

            {/* pts label */}
            <span className={styles.ptsLabel}>pts</span>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.statusWrapper}>
          <Image src="/img/flag.svg?v=original" alt="Flag" width={8} height={10} />
          <span className={styles.statusText}>Status: Flagged</span>
        </div>
      </div>
    </div>
  );
}
