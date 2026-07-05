"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import "./authentication.css";

const Authentication: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleContinue = async (): Promise<void> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        setError("");
        router.push("/welcome");
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
    <div className="page-container">
      <div className="content-wrapper">
        <div className="header-section">
          <img src="/tseLogo.png" alt="TSE Logo" className="tse-logo" />
          <h1 className="org-title">Triton Software Engineering</h1>
          <p className="org-subtitle">Track Social Points Easier</p>
        </div>

        <div className="input-card">
          <label htmlFor="auth-code" className="input-label">
            Authentication Code
          </label>
          <input
            id="auth-code"
            type="text"
            className={`code-input ${error ? "input-error" : ""}`}
            placeholder="*****"
            value={code}
            onChange={handleInputChange}
            suppressHydrationWarning={true}
          />
          {error ? (
            <span className="error-text">{error}</span>
          ) : (
            <span className="helper-text">Enter the universal code!</span>
          )}
        </div>

        <div className="button-container">
          <button
            className="continue-button"
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
};

export default Authentication;
