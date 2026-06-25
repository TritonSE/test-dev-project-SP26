"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import styles from "./success.module.css";

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Karen";
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
      <p className={styles.redirectMessage}>Redirecting to leaderboard...</p>

      <div className={styles.avatar}>
        {avatar ? (
          <Image src={avatar} alt={name} width={173} height={173} />
        ) : (
          <Image src="/avatar.png" alt={`${name} avatar`} width={173} height={173} />
        )}
      </div>

      <div className={styles.spinner} />
    </div>
  );
}
