"use client";

import { Rubik } from "next/font/google";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import styles from "./leaderboard.module.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  variable: "--rubik",
});

export default function LeaderboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") ?? "";

  useEffect(() => {
    if (!name) {
      router.replace("/login/name");
      return;
    }

    const timer = setTimeout(() => {
      router.push(`/rankings?name=${encodeURIComponent(name)}`);
    }, 1600);

    return () => clearTimeout(timer);
  }, [name, router]);

  return (
    <main className={`${styles.teamContainer} ${rubik.variable}`}>
      <div className={styles.transitionContent}>
        <h1 className={styles.title}>
          <span className={styles.bold}>TEST</span> in the lead🥳
        </h1>

        <h2 className={styles.points}>100</h2>

        <Image
          src="/eshaan-profile.jpg"
          alt={`Headshot of ${name}`}
          width={371}
          height={366}
          className={styles.profilePicture}
        />

        <h3 className={styles.rank}>
          <span className={styles.rankNum}>1st</span> Place
        </h3>
      </div>
    </main>
  );
}
