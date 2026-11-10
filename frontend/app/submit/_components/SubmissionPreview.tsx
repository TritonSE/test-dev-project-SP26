"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import type { EventDetails } from "./EventDetailsStep";
import TeamChip, { getTeamVariantClassName } from "./TeamChip";
import teamChipStyles from "./teamChip.module.css";
import styles from "./submissionPreview.module.css";

type TaggedMember = {
  id: string;
  memberName: string;
  teamId: string;
  teamName: string;
  isPvp: boolean;
  x: number;
  y: number;
};

type Team = {
  id: string;
  name: string;
  members: number;
};

type Props = {
  photos: string[];
  tagsByPhoto: TaggedMember[][];
  teams: Team[];
  eventDetails: EventDetails;
};

export default function SubmissionPreview({ photos, tagsByPhoto, teams, eventDetails }: Props) {
  const router = useRouter();
  const taggedMembers = tagsByPhoto.flat();
  const submitter = taggedMembers[0];
  const isFlagged = taggedMembers.some((tag) => tag.isPvp);
  const formattedDate = eventDetails.eventDate
    ? new Date(`${eventDetails.eventDate}T00:00:00`).toLocaleDateString(undefined, {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <section className={styles.preview} aria-label="Submission preview">
      <div className={styles.submitterRow}>
        <div className={styles.identity}>
          <div className={styles.avatar} aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="14" r="7" fill="currentColor" />
              <path d="M7 34c0-7.18 5.82-13 13-13s13 5.82 13 13" fill="currentColor" />
            </svg>
          </div>
          <span className={styles.submitterName}>{submitter?.memberName ?? ""}</span>
        </div>
        {submitter && (
          <div className={styles.submitterTeam}>
            <TeamChip
              team={{
                id: submitter.teamId,
                name: submitter.isPvp ? "PVP" : submitter.teamName,
              }}
            />
          </div>
        )}
      </div>

      <div className={styles.eventMeta}>
        <span>{formattedDate}</span>
        <span className={styles.location}>{eventDetails.location}</span>
      </div>

      <div className={styles.photoCarousel} aria-label="Submission photos">
        {photos.map((photo, photoIndex) => (
          <div className={styles.photoSlide} key={`${photoIndex}-${photo.slice(0, 24)}`}>
            <Image
              src={photo}
              alt={`Submission photo ${photoIndex + 1}`}
              fill
              sizes="(max-width: 402px) calc(100vw - 70px), 332px"
              className={styles.photo}
              draggable={false}
            />
            {(tagsByPhoto[photoIndex] ?? []).map((tag) => (
              <span
                className={styles.photoTag}
                key={tag.id}
                style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
              >
                {tag.memberName}
              </span>
            ))}
          </div>
        ))}
      </div>

      <h2 className={styles.eventName}>{eventDetails.eventName || "Untitled event"}</h2>

      <div className={styles.teamScores}>
        {teams.map((team) => (
          <div
            className={`${styles.teamScore} ${getTeamVariantClassName(team.name)}`}
            key={team.id}
          >
            <TeamChip team={team} />
            <span className={styles.calculation}>{team.members} × 1 =</span>
            <span className={`${teamChipStyles.scoreBubble} ${styles.points}`}>{team.members}</span>
            <span className={styles.pointsLabel}>pts</span>
          </div>
        ))}
      </div>

      <div className={styles.reviewFooter}>
        <p className={isFlagged ? styles.flaggedStatus : styles.readyStatus}>
          {isFlagged ? "⚑ Status: Flagged" : "Status: Ready"}
        </p>
        <button
          type="button"
          className={styles.submitButton}
          onClick={() =>
            router.push(`/submit/success?name=${encodeURIComponent(submitter?.memberName ?? "")}`)
          }
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m21 3-7.2 18-3.9-7.2L3 10.1 21 3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="m9.9 13.8 5-5" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>Submit for Review</span>
        </button>
      </div>
    </section>
  );
}
