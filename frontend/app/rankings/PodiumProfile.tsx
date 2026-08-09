import Image from "next/image";

import styles from "./rankings.module.css";

type PodiumProfileProps = {
  rank: number;
  points: number;
  name: string;
  imageSrc: string;
};

export default function PodiumProfile({ rank, points, name, imageSrc }: PodiumProfileProps) {
  const isFirst = rank === 1;
  const isSecond = rank === 2;

  const pointsClass = isFirst
    ? styles.firstPoints
    : isSecond
      ? styles.secondPoints
      : styles.thirdPoints;
  const profileClass = isFirst
    ? styles.firstProfile
    : isSecond
      ? styles.secondProfile
      : styles.thirdProfile;
  const rankClass = isFirst ? styles.firstRank : isSecond ? styles.secondRank : styles.thirdRank;

  const colorClass = isFirst ? styles.gold : isSecond ? styles.silver : styles.bronze;
  const suffix = rank === 1 ? "st " : rank === 2 ? "nd " : "rd ";

  return (
    <div className={styles.topProfile}>
      <h3 className={pointsClass}>{points}</h3>
      <Image
        src={imageSrc}
        alt={`Headshot of ${name}`}
        width={150}
        height={150}
        className={profileClass}
      />
      <h3 className={rankClass}>
        <span className={colorClass}>
          {rank}
          {suffix}
        </span>
        Place
      </h3>
    </div>
  );
}
