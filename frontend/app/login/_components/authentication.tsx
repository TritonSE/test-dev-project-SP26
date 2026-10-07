"use client";

import Image, { type StaticImageData } from "next/image";
import React, { useState } from "react";

import tseLogo from "@/public/tseLogo.png";

import styles from "./authentication.module.css";

type AuthenticationProps = {
  onContinue: () => void;
};

export default function Authentication({ onContinue }: AuthenticationProps) {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleContinue = async (): Promise<void> => {
    try {
      const res = await fetch(`api/config/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        setError("");
        onContinue();
      } else {
        setError("Incorrect code, try again");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCode(e.target.value);
    if (error) setError("");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.headerSection}>
          <Image
            src={tseLogo as StaticImageData}
            alt="TSE Logo"
            className="tse-logo"
            loading="eager"
          />
          <h1 className={styles.orgTitle}>Triton Software Engineering</h1>
          <p className={styles.orgSubtitle}>Track Social Points Easier</p>
        </div>

        <div className={styles.inputCard}>
          <label htmlFor="auth-code" className={styles.inputLabel}>
            Authentication Code
          </label>
          <input
            id="auth-code"
            type="text"
            className={`${styles.codeInput} ${error ? styles.inputError : ""}`}
            placeholder="*****"
            value={code}
            onChange={handleInputChange}
            suppressHydrationWarning={true}
          />
          {error ? (
            <span className={styles.errorText}>{error}</span>
          ) : (
            <span className={styles.helperText}>Enter the universal code!</span>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.continueButton}
            onClick={() => {
              void handleContinue();
            }}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
