"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import styles from "./page.module.css";

export default function SelectPhotosPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<{ id: string; url: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function readFiles() {
    const el = inputRef.current;
    if (!el) return;
    const files = Array.from(el.files ?? []);
    if (files.length === 0) return;
    el.value = "";
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        if (!result) return;
        const newPhoto = { id: crypto.randomUUID(), url: result };

        setPhotos((prev) => (prev.length < 24 ? [...prev, newPhoto] : prev));
      };
      reader.readAsDataURL(file);
    });
  }

  function removePhoto(id: string) {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  }

  function handleNext() {
    if (photos.length === 0) return;
    const photoUrls = photos.map((p) => p.url);
    sessionStorage.setItem("pendingPhotos", JSON.stringify(photoUrls));
    router.push("/submit");
  }

  const gridItems = Array.from({ length: 24 }, (_, i) => photos[i] ?? null);

  return (
    <main className={styles.pageContainer}>
      <button onClick={() => router.back()} className={styles.backButton}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <line
            x1="1"
            y1="1"
            x2="14"
            y2="14"
            stroke="rgba(0,0,0,1)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="14"
            y1="1"
            x2="1"
            y2="14"
            stroke="rgba(0,0,0,1)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className={styles.albumSelector}>
        <span className={styles.albumName}>All Photos</span>
        <svg width="18" height="9" viewBox="0 0 18 9" fill="none">
          <path
            d="M1 1L9 8L17 1"
            stroke="rgba(51,54,63,1)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className={styles.fileInput}
        onChange={readFiles}
      />

      <div className={styles.photoGrid} onClick={() => inputRef.current?.click()}>
        {gridItems.map((item, i) =>
          item ? (
            <div key={item.id} className={styles.photoCell}>
              <Image
                src={item.url}
                alt={`Selected photo ${i + 1}`}
                fill
                sizes="100px"
                loading={i === 0 ? "eager" : "lazy"}
                className={styles.photoImage}
                draggable={false}
              />
            </div>
          ) : (
            <div key={`empty-${i}`} className={styles.emptyPhotoCell} />
          ),
        )}
      </div>

      <div className={styles.photoActions}>
        <div className={styles.selectedPhotosScroller}>
          <div className={styles.selectedPhotosList}>
            {photos.map((photo, i) => (
              <div key={photo.id} className={styles.thumbnailWrapper}>
                <Image
                  src={photo.url}
                  alt={`Selected ${i + 1}`}
                  fill
                  sizes="48px"
                  loading={i === 0 ? "eager" : "lazy"}
                  className={styles.thumbnailImage}
                  draggable={false}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(photo.id);
                  }}
                  className={styles.removePhotoButton}
                >
                  <svg width="5.25" height="5.25" viewBox="0 0 5.25 5.25" fill="none">
                    <line
                      x1="0.5"
                      y1="0.5"
                      x2="4.75"
                      y2="4.75"
                      stroke="rgba(34,34,34,1)"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <line
                      x1="4.75"
                      y1="0.5"
                      x2="0.5"
                      y2="4.75"
                      stroke="rgba(34,34,34,1)"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <button disabled={photos.length === 0} onClick={handleNext} className={styles.nextButton}>
          <span className={styles.nextButtonLabel}>Next</span>
        </button>
      </div>
    </main>
  );
}
