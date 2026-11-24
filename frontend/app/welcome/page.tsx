"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./welcome.module.css";

import type { StaticImageData } from "next/image";

import avatar from "@/public/avatar.png";
import epBack from "@/public/ep_back.svg";

type Member = {
  name: string;
  photoUrl: string | null;
};

type Team = {
  _id: string;
  teamName: string;
  points: number;
  avatarUrl?: string | null;
};

type PhotoStatus = "loading" | "loaded" | "missing" | "error";

export default function WelcomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoStatus, setPhotoStatus] = useState<PhotoStatus>("loading");

  const name = searchParams.get("name");

  useEffect(() => {
    if (!name) {
      router.replace("/login/name");
      return;
    }

    const memberName = name;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function loadMemberPhoto() {
      try {
        const [membersResponse, teamsResponse] = await Promise.all([
          fetch("/api/members"),
          fetch("/api/teams/"),
        ]);

        if (!membersResponse.ok || !teamsResponse.ok) {
          throw new Error("Failed to fetch welcome data");
        }

        const [members, teams] = (await Promise.all([
          membersResponse.json(),
          teamsResponse.json(),
        ])) as [Member[], Team[]];
        const member = members.find(
          (item) => item.name.trim().toLowerCase() === memberName.trim().toLowerCase(),
        );
        const firstPlace = [...teams].sort((a, b) => b.points - a.points)[0];

        if (firstPlace) {
          sessionStorage.setItem("firstPlaceTeam", JSON.stringify(firstPlace));
        }

        if (member?.photoUrl) {
          setPhotoUrl(member.photoUrl);
          setPhotoStatus("loaded");
        } else {
          setPhotoUrl(null);
          setPhotoStatus("missing");
        }
      } catch (error) {
        console.error("Error fetching member photo:", error);
        setPhotoUrl(null);
        setPhotoStatus("error");
      }
    }

    void loadMemberPhoto().finally(() => {
      if (cancelled) return;

      timer = setTimeout(() => {
        router.push(`/leaderboard?name=${encodeURIComponent(name)}`);
      }, 2000);
    });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [name, router]);

  const handleBack = () => {
    router.push("/login/name");
  };

  return (
    <main className={styles.container}>
      <button className={styles.backButton} onClick={handleBack} type="button">
        <Image src={epBack as StaticImageData} alt="Go back" width={24} height={24} />
      </button>

      <h1 className={styles.greeting}>
        Welcome,
        <br />
        {name}!
      </h1>

      <p className={styles.loadMessage}>Logging you in now...</p>

      <div className={styles.avatar}>
        {photoStatus === "loading" && null}
        {photoStatus === "loaded" && photoUrl && (
          <Image
            src={photoUrl}
            alt={`${name} avatar`}
            width={173}
            height={173}
            loading="eager"
            unoptimized
          />
        )}
        {(photoStatus === "missing" || photoStatus === "error") && (
          <Image src={avatar} alt={`${name} avatar`} width={173} height={173} loading="eager" />
        )}
      </div>

      <div className={styles.spinner} />
    </main>
  );
}
