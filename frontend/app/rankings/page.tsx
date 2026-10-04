"use client";

import { useSearchParams } from "next/navigation";

import IndividualTeam from "./_components/IndividualTeam";
import PodiumProfile from "./_components/PodiumProfile";
import styles from "./rankings.module.css";
import TabSwitch from "./_components/TabSwitch";

const podiumTeams = [
  {
    rank: 3,
    name: "Nancy",
    points: 50,
    imageSrc: "/eshaan-profile.jpg",
  },
  {
    rank: 1,
    name: "Eshaan",
    points: 100,
    imageSrc: "/eshaan-profile.jpg",
  },
  {
    rank: 2,
    name: "Sur",
    points: 80,
    imageSrc: "/eshaan-profile.jpg",
  },
];

const topThreeList = [
  {
    rank: 1,
    name: "TEST",
    points: 10,
    containerStyle: styles.firstPlace,
  },
  {
    rank: 2,
    name: "F3 Global",
    points: 10,
    containerStyle: styles.secondPlace,
  },
  {
    rank: 3,
    name: "Homestart",
    points: 10,
    containerStyle: styles.thirdPlace,
  },
];

const runnerUpsList = [
  {
    rank: 4,
    name: "PVP",
    points: 10,
    containerStyle: "",
  },
  {
    rank: 5,
    name: "DBC",
    points: 10,
    containerStyle: "",
  },
  {
    rank: 6,
    name: "Fulcrum",
    points: 10,
    containerStyle: "",
  },
  {
    rank: 7,
    name: "CRED",
    points: 10,
    containerStyle: "",
  },
  {
    rank: 8,
    name: "Meemli",
    points: 10,
    containerStyle: "",
  },
];

export default function RankingsPage() {
  const searchParams = useSearchParams();

  const selectedName = searchParams.get("name") ?? "Eshaan";

  const updatedPodiumTeams = podiumTeams.map((team) =>
    team.rank === 1
      ? {
          ...team,
          name: selectedName,
        }
      : team,
  );

  return (
    <main className={styles.leaderboardContainer}>
      <TabSwitch activeTab="ranks" onTabSwitch={(tab) => console.info(tab)} />

      <div className={styles.topThree}>
        {updatedPodiumTeams.map((team) => (
          <PodiumProfile
            key={team.rank}
            rank={team.rank}
            points={team.points}
            name={team.name}
            imageSrc={team.imageSrc}
          />
        ))}
      </div>

      <div className={styles.leaderboard}>
        <h2 className={styles.mainLabel}>Top 3 Teams</h2>

        {topThreeList.map((team) => (
          <IndividualTeam
            key={team.rank}
            rank={team.rank}
            name={team.name}
            points={team.points}
            containerStyle={team.containerStyle}
          />
        ))}

        <h2 className={styles.mainLabel}>Runner Ups</h2>

        {runnerUpsList.map((team) => (
          <IndividualTeam
            key={team.rank}
            rank={team.rank}
            name={team.name}
            points={team.points}
            containerStyle={team.containerStyle}
          />
        ))}
      </div>
    </main>
  );
}
