"use client";

import Image from "next/image";

import type { EventDetails } from "./EventDetailsStep";
import EventDetailsStep from "./EventDetailsStep";
import PointAllocation from "./PointAllocation";
import TeamHosting from "./TeamHosting";
import styles from "./submissionForm.module.css";

type TaggedMember = {
  id: string;
  memberName: string;
  teamId: string;
  teamName: string;
  isPvp: boolean;
  x: number;
  y: number;
};

type SubmissionFormProps = {
  photos: string[];
  tagsByPhoto: TaggedMember[][];
  teams: { id: string; name: string; members: number }[];
  eventDetails: EventDetails;
  onEventDetailsChange: (field: keyof EventDetails, value: string) => void;
};

export default function SubmissionForm({
  photos,
  tagsByPhoto,
  teams,
  eventDetails,
  onEventDetailsChange,
}: SubmissionFormProps) {
  const allTags = tagsByPhoto.flat();
  const pvpMembers = allTags.filter((tag) => tag.isPvp);

  return (
    <div className={styles.formContainer}>
      <div
        className={`${styles.photoPreview} ${photos.length === 1 ? styles.photoPreviewCentered : ""}`}
        aria-label="Photos and tagged members"
      >
        {photos.map((photo, photoIndex) => (
          <div className={styles.photoSlide} key={`${photoIndex}-${photo.slice(0, 24)}`}>
            <Image
              src={photo}
              alt={`Tagged event photo ${photoIndex + 1}`}
              fill
              sizes="144px"
              className={styles.photoImage}
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
      <EventDetailsStep value={eventDetails} onChange={onEventDetailsChange} />
      <TeamHosting teams={teams} />
      <section className={styles.pvpSection}>
        <h2 className={styles.sectionTitle}>PVP members present?</h2>
        <div className={styles.pvpChoices}>
          <label>
            <input type="radio" name="pvpHandling" value="no" defaultChecked />
            No
          </label>
          <label>
            <input type="radio" name="pvpHandling" value="assign" />
            Yes (assign PVP pts to a team)
          </label>
          <label>
            <input type="radio" name="pvpHandling" value="exclude" />
            Yes (do not count PVP pts)
          </label>
          {pvpMembers.length > 0 && (
            <p className={styles.pvpMemberNames}>
              Tagged PVP members: {pvpMembers.map((tag) => tag.memberName).join(", ")}
            </p>
          )}
        </div>
      </section>
      <PointAllocation teams={teams} />
    </div>
  );
}
