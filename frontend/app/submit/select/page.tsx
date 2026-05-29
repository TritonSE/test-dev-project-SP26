"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SelectPhotosPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function stopPoll() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

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
        setPhotos((prev) => (prev.length < 24 ? [...prev, result] : prev));
      };
      reader.readAsDataURL(file);
    });
  }

  function startPoll() {
    const el = inputRef.current;
    if (!el) return;
    stopPoll();
    let n = 0;
    pollRef.current = setInterval(() => {
      n++;
      const len = el.files?.length ?? 0;
      if (len > 0) {
        stopPoll();
        readFiles();
      } else if (n > 75) stopPoll();
    }, 200);
  }

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.addEventListener("change", readFiles);
    return () => el.removeEventListener("change", readFiles);
  }, []);

  function removePhoto(idx: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleNext() {
    if (photos.length === 0) return;
    sessionStorage.setItem("pendingPhotos", JSON.stringify(photos));
    router.push("/submit");
  }

  const gridItems = Array.from({ length: 24 }, (_, i) => photos[i] ?? null);

  return (
    <main className="relative bg-white w-full max-w-[402px] min-h-[874px] mx-auto overflow-hidden">
      <button
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: 34,
          left: 22,
          width: 30,
          height: 30,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
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

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 136.96,
          display: "flex",
          alignItems: "center",
          gap: 11,
          height: 24,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: "100%",
            color: "rgba(0,0,0,1)",
            whiteSpace: "nowrap",
          }}
        >
          All Photos
        </span>
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
        style={{ display: "none" }}
        onClick={startPoll}
      />

      <div
        style={{
          position: "absolute",
          top: 145,
          left: 0,
          right: 0,
          height: 613,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "100.5px",
          gap: 2,
          cursor: "pointer",
        }}
        onClick={() => inputRef.current?.click()}
      >
        {gridItems.map((url, i) =>
          url ? (
            <div
              key={i}
              style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}
            >
              <img
                src={url}
                alt={`Selected photo ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                draggable={false}
              />
            </div>
          ) : (
            <div key={i} style={{ width: "100%", height: "100%", background: "#E5E7EB" }} />
          ),
        )}
      </div>

      <div
        style={{
          position: "absolute",
          top: 780,
          left: 0,
          right: 0,
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 16,
          paddingRight: 24,
        }}
      >
        <div style={{ overflowX: "auto", overflowY: "visible", maxWidth: 220 }}>
          <div style={{ display: "flex", gap: 6, paddingTop: 8, paddingBottom: 2 }}>
            {photos.map((url, i) => (
              <div key={i} style={{ position: "relative", width: 48, height: 48, flexShrink: 0 }}>
                <img
                  src={url}
                  alt={`Selected ${i + 1}`}
                  style={{
                    width: 48,
                    height: 48,
                    objectFit: "cover",
                    borderRadius: 6,
                    display: "block",
                  }}
                  draggable={false}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(i);
                  }}
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    width: 15.75,
                    height: 15.75,
                    borderRadius: 10,
                    background: "rgba(255,255,255,1)",
                    border: "1px solid rgba(34,34,34,1)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 5,
                    boxSizing: "border-box",
                  }}
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

        <button
          disabled={photos.length === 0}
          onClick={handleNext}
          style={{
            width: 131,
            height: 48,
            borderRadius: 100,
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 25,
            paddingRight: 25,
            background: "#000000",
            border: "none",
            opacity: photos.length > 0 ? 1 : 0.4,
            cursor: photos.length > 0 ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 600,
              fontSize: 20,
              lineHeight: "100%",
              color: "#FFFFFF",
            }}
          >
            Next
          </span>
        </button>
      </div>
    </main>
  );
}
