"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "../history.module.css";

type HistorySocialAlertProps = {
  teams: string;
  eventName: string;
  points: number;
  date: string;
  photoUrls: string[];
};

export default function HistorySocialAlert({
  teams,
  eventName,
  points,
  date,
  photoUrls,
}: HistorySocialAlertProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className={`${styles.alert} ${styles.clickable}`}
        onClick={() => setIsPopupOpen(true)}
      >
        <span className={`${styles.alertIcon} ${styles.socialIcon}`}>
          <Image src="/social-icon.svg" alt="" width={20} height={20} />
        </span>

        <span className={styles.alertText}>
          <strong>New Social Alert:</strong>
          <br />
          {teams}&apos;s {eventName}. <span className={styles.points}>+{points} points.</span>
        </span>

        <span className={styles.alertDate}>{date}</span>
      </button>

      {isPopupOpen && (
        // Clicking the dark background closes the popup
        <div className={styles.popupOverlay} onClick={() => setIsPopupOpen(false)}>
          {/* stopPropagation so clicks inside the white box don't close it */}
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.popupClose}
              onClick={() => setIsPopupOpen(false)}
            >
              <Image src="/close-icon.svg" alt="Close" width={15} height={15} />
            </button>

            <h2 className={styles.popupTitle}>{eventName}</h2>

            <div className={styles.popupPhotos}>
              {photoUrls.map((url) => (
                // eslint-disable-next-line next/no-img-element
                <img key={url} src={url} alt={eventName} className={styles.popupPhoto} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
