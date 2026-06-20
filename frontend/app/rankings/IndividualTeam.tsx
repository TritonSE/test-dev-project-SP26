import Image from "next/image";

import styles from "./rankings.module.css";

type IndividualTeamProps = {
  rank: number;
  name: string;
  points: number;
  logoSrc?: string;
  containerStyle: string;
};

export default function IndividualTeam({
  rank,
  name,
  points,
  logoSrc = "/tse-logo.svg",
  containerStyle = "",
}: IndividualTeamProps) {
  return (
    <div className={`${styles.teamContainer} ${containerStyle}`}>
      <div className={styles.rankTeamGroup}>
        <h3 className={styles.rank}>#{rank}</h3>
        <div className={styles.logoTeam}>
          <Image src={logoSrc} alt={`TSE logo`} width={35} height={35} className={styles.logo} />
          <h3 className={styles.teamName}>{name}</h3>
        </div>
      </div>
      <p className={styles.points}>{points}pts</p>
    </div>
  );
}
