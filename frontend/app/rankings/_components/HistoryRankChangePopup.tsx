"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import styles from "../history.module.css";

import type { TouchEvent } from "react";

type HistoryRankChangePopupProps = {
  photoUrls: string[];
  onClose: () => void;
};

const CLOSE_ICON_SIZE = 32;
const ARROW_ICON_WIDTH = 7;
const ARROW_ICON_HEIGHT = 12;
const SWIPE_THRESHOLD = 40; // how far (px) a finger must move to count as a swipe

function getPosition(index: number, current: number) {
  if (index === current) return "current";
  if (index === current + 1) return "next";
  if (index > current + 1) return "later";
  if (index === current - 1) return "previous";
  return "earlier";
}

export default function HistoryRankChangePopup({
  photoUrls,
  onClose,
}: HistoryRankChangePopupProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const showPrevious = () => setCurrent((index) => Math.max(index - 1, 0));
  const showNext = () => setCurrent((index) => Math.min(index + 1, photoUrls.length - 1));

  const handleTouchEnd = (e: TouchEvent) => {
    const distance = e.changedTouches[0].clientX - touchStartX.current;
    if (distance > SWIPE_THRESHOLD) showPrevious();
    if (distance < -SWIPE_THRESHOLD) showNext();
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h2 className={`${styles.popupTitle} ${styles.recentSocialsTitle}`}>Recent Socials</h2>

          <button type="button" className={styles.popupClose} onClick={onClose} aria-label="Close">
            <Image
              src="/red-close-icon.svg"
              alt=""
              width={CLOSE_ICON_SIZE}
              height={CLOSE_ICON_SIZE}
            />
          </button>
        </div>

        {/* A stack of photos: the current one in front, the others faded behind it on each side */}
        <div
          className={styles.carousel}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.carouselStack}>
            {photoUrls.map((url, index) => (
              // eslint-disable-next-line next/no-img-element
              <img
                key={url}
                src={url}
                alt=""
                className={styles.carouselPhoto}
                data-position={getPosition(index, current)}
              />
            ))}
          </div>

          <button
            type="button"
            className={`${styles.carouselButton} ${styles.carouselPrevious}`}
            onClick={showPrevious}
            disabled={current === 0}
            aria-label="Previous photo"
          >
            <Image
              src="/chevron-left.svg"
              alt=""
              width={ARROW_ICON_WIDTH}
              height={ARROW_ICON_HEIGHT}
            />
          </button>

          <button
            type="button"
            className={`${styles.carouselButton} ${styles.carouselNext}`}
            onClick={showNext}
            disabled={current >= photoUrls.length - 1}
            aria-label="Next photo"
          >
            <Image
              src="/chevron-right.svg"
              alt=""
              width={ARROW_ICON_WIDTH}
              height={ARROW_ICON_HEIGHT}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
