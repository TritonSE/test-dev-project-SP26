"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "User";
  const avatar = searchParams.get("avatar") || "";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/leaderboard");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.confirmationContainer}>
      <h1 className={styles.thankYouHeading}>
        Thanks for your submission,
        <br />
        <span>{name}!</span>
      </h1>

      <div className={styles.avatar}>
        {avatar ? (
          <Image src={avatar} alt={name} width={173} height={173} />
        ) : (
          <div className={styles.avatarPlaceholder} />
        )}
      </div>

      <div className={styles.spinner} />

      <p className={styles.redirectMessage}>Redirecting to leaderboard...</p>
    </div>
  );
}
