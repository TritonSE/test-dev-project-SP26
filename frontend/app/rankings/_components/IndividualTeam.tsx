import Image from "next/image";

import styles from "../rankings.module.css";

type IndividualTeamProps = {
  rank: number;
  name: string;
  points: number;
  logoSrc?: string;
  containerStyle?: string;
  onClick?: () => void;
  isExpanded?: boolean;
  recentSubmission?: {
    eventName: string;
    points: number;
    date: string;
  } | null;
};

export default function IndividualTeam({
  rank,
  name,
  points,
  logoSrc = "/tse-logo.svg",
  containerStyle = "",
  onClick,
  isExpanded = false,
  recentSubmission,
}: IndividualTeamProps) {
  return (
    <div
      className={`${styles.teamContainer} ${containerStyle} ${
        isExpanded ? styles.expandedTeam : ""
      }`}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className={styles.teamSummary}>
        <div className={styles.rankTeamGroup}>
          <h3 className={styles.rank}>#{rank}</h3>

          <div className={styles.logoTeam}>
            <Image
              src={logoSrc}
              alt={`${name} logo`}
              width={35}
              height={35}
              className={styles.logo}
            />

            <h3 className={styles.teamName}>{name}</h3>
          </div>
        </div>

        <p className={styles.points}>{points}pts</p>
      </div>

      {isExpanded && recentSubmission && (
        <div className={styles.recentActivity}>
          <span className={styles.activityLabel}>RECENT ACTIVITY</span>
          <div className={styles.activityContent}>
            <Image
              src="/social_icon.png"
              alt=""
              width={48}
              height={48}
              className={styles.activityIcon}
            />
            <div className={styles.activityDetails}>
              <strong>New Social Alert:</strong>
              <div className={styles.activityDescriptionRow}>
                <span>{recentSubmission.eventName}</span>
                <span className={styles.activityDate}>
                  {new Date(recentSubmission.date).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>
              <span>+{recentSubmission.points} points</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
