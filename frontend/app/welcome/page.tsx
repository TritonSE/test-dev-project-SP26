"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import styles from "./welcome.module.css";

export default function WelcomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name");

  useEffect(() => {
    if (!name) {
      router.replace("/login/name");
      return;
    }

    const timer = setTimeout(() => {
      router.push(`/leaderboard?name=${encodeURIComponent(name)}`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [name, router]);

  const handleBack = () => {
    router.push("/login/name");
  };

  return (
    <main className={styles.container}>
      <button className={styles.backButton} onClick={handleBack} type="button">
        <Image src="/ep_back.svg" alt="Go back" width={24} height={24} />
      </button>

      <h1 className={styles.greeting}>
        Welcome,
        <br />
        {name}!
      </h1>

      <p className={styles.loadMessage}>Logging you in now...</p>

      <div className={styles.avatar}>
        <img src="/Ellipse3819.svg" alt={`${name} avatar`} />
      </div>

      <div className={styles.spinner} />
    </main>
  );
}
