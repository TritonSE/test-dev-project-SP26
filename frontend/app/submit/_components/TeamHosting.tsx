"use client";
import TeamChip from "./TeamChip";
import teamChipStyles from "./teamChip.module.css";
import styles from "./teamHosting.module.css";

type Team = {
  id: string;
  name: string;
  members: number;
};

type Props = {
  teams: Team[];
};

export default function TeamsHosting({ teams }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Teams Hosting</h2>

      <div className={styles.chipList}>
        {teams.map((team) => (
          <TeamChip key={team.id} team={team} />
        ))}
      </div>

      <div className={styles.infoSection}>
        <p className={styles.infoText}>
          If teams are missing, go back and tag people from those teams. Points will be split by
          headcount.
        </p>
      </div>

      <div className={styles.dividerContainer}>
        <hr className={styles.divider} />
      </div>

      <div className={styles.featuredList}>
        {teams.map((team) => (
          <div key={team.id} className={styles.featuredRow}>
            <TeamChip team={team} />
            <div className={styles.scoreGroup}>
              <div className={teamChipStyles.scoreBubble}>{team.members}</div>
              <span className={styles.membersLabel}>members</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dividerContainer}>
        <hr className={styles.divider} />
      </div>
    </div>
  );
}
