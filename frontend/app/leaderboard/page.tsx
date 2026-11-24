"use client";

import { Rubik } from "next/font/google";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import styles from "./leaderboard.module.css";

type Team = {
  _id: string;
  teamName: string;
  points: number;
  avatarUrl?: string | null;
};

const getStoredFirstPlace = (): Team | null => {
  const storedTeam = sessionStorage.getItem("firstPlaceTeam");
  if (!storedTeam) return null;

  try {
    return JSON.parse(storedTeam) as Team;
  } catch (error) {
    console.error("Error reading first-place team:", error);
    sessionStorage.removeItem("firstPlaceTeam");
    return null;
  }
};

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  variable: "--rubik",
});

function LeaderboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [firstPlace, setFirstPlace] = useState<Team | null>(null);
  const [isTeamLoaded, setIsTeamLoaded] = useState(false);

  const name = searchParams.get("name") ?? "";

  useEffect(() => {
    setFirstPlace(getStoredFirstPlace());
    setIsTeamLoaded(true);
  }, []);

  useEffect(() => {
    if (!name) {
      router.replace("/login/name");
      return;
    }

    if (!isTeamLoaded) {
      return;
    }

    const timer = setTimeout(() => {
      router.push(`/rankings?name=${encodeURIComponent(name)}`);
    }, 1600);

    return () => clearTimeout(timer);
  }, [isTeamLoaded, name, router]);

  if (!isTeamLoaded) {
    return null;
  }

  const firstPlaceName = firstPlace?.teamName;
  const firstPlacePoints = firstPlace?.points;
  const firstPlaceImage = firstPlace?.avatarUrl || "/profile_placeholder.svg";

  return (
    <main className={`${styles.teamContainer} ${rubik.variable}`}>
      <div className={styles.transitionContent}>
        <h1 className={styles.title}>
          {firstPlace ? (
            <>
              <span className={styles.bold}>{firstPlaceName}</span> in the lead🥳
            </>
          ) : (
            "No team in the lead yet"
          )}
        </h1>

        {firstPlace && <h2 className={styles.points}>{firstPlacePoints}</h2>}

        <Image
          src={firstPlaceImage}
          alt={firstPlace ? `Profile picture of ${firstPlaceName}` : "Team profile placeholder"}
          width={371}
          height={366}
          className={styles.profilePicture}
        />

        {firstPlace && (
          <h3 className={styles.rank}>
            <span className={styles.rankNum}>1st</span> Place
          </h3>
        )}
      </div>
    </main>
  );
}

export default function LeaderboardPage() {
  return (
    <Suspense fallback={null}>
      <LeaderboardContent />
    </Suspense>
  );
}
