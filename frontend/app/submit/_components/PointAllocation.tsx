"use client";

import Image from "next/image";

import styles from "./pointAllocation.module.css";
import TeamChip from "./TeamChip";
import teamChipStyles from "./teamChip.module.css";

type Team = {
  id: string;
  name: string;
  members: number;
};

type Props = {
  teams: Team[];
};

export default function PointAllocation({ teams }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Point Allocation</h2>

      {/* Rows with team pairs and scores */}
      <div className={styles.pairsList}>
        {teams.map((team) => (
          <div key={team.id} className={styles.pairRow}>
            <TeamChip team={team} />
            <div className={styles.spacer}></div>
            <span className={styles.calcLabel}>{team.members} × 1 =</span>
            <div className={teamChipStyles.scoreBubble}>{team.members}</div>
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
