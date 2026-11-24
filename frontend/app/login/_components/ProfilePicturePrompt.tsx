"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./profilePicturePrompt.module.css";

import BackIcon from "@/public/ep_back.svg";
import pic_placeholder from "@/public/profile_placeholder.svg";

type Member = {
  name: string;
  _id: string;
  photoUrl: string | null;
};

type ProfilePicturePromptProps = {
  member: Member;
  onBack: () => void;
  onComplete: () => void;
};

type StaticImageData = { src: string; height: number; width: number; blurDataURL?: string };

export default function ProfilePicturePrompt({
  member,
  onBack,
  onComplete,
}: ProfilePicturePromptProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(`/api/members/${member._id}/upload-profile-picture`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload profile picture");
      }

      onComplete();
    } catch (uploadError) {
      console.error("Error uploading profile picture:", uploadError);
      setError("We couldn't upload that picture. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className={styles.container}>
      <button className={styles.backButton} onClick={onBack} type="button" aria-label="Go back">
        <Image src={BackIcon as StaticImageData} alt="" width={24} height={24} />
      </button>

      <section className={styles.card} aria-labelledby="profile-picture-title">
        <h1 id="profile-picture-title" className={styles.title}>
          New User?
        </h1>
        <p> Show us your smile😁.</p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={(event) => {
            setSelectedFile(event.target.files?.[0] ?? null);
            setError("");
          }}
        />

        <button
          className={styles.uploadButton}
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image
            src={(previewUrl ?? pic_placeholder) as StaticImageData}
            alt="Selected profile picture"
            width={173}
            height={173}
            className={previewUrl ? styles.previewImage : ""}
            loading="eager"
          />
        </button>

        {error && <p className={styles.error}>{error}</p>}
        {!selectedFile && (
          <button className={styles.skipButton} type="button" onClick={onComplete}>
            SKIP FOR NOW
          </button>
        )}
        {selectedFile && (
          <button
            className={`${styles.skipButton} ${styles.uploadContinueButton}`}
            type="button"
            disabled={isUploading}
            onClick={() => {
              void handleUpload();
            }}
          >
            {isUploading ? "UPLOADING..." : "UPLOAD AND CONTINUE"}
          </button>
        )}
      </section>
    </main>
  );
}
