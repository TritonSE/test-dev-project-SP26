"use client";

import Image from "next/image";
import styles from "./submit.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Member = { id: string; name: string; team: string };

type Tag = {
  id: string;
  x: number;
  y: number;
  memberId: string;
  memberName: string;
  isPvp: boolean;
};

let tagCounter = 0;

const ITEM_WIDTH = 343; // 328px photo + 15px gap

export default function SubmitPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [scrollX, setScrollX] = useState(0);
  const [tagsByPhoto, setTagsByPhoto] = useState<Tag[][]>([]);
  const [pendingTag, setPendingTag] = useState<{ x: number; y: number } | null>(null);
  const [draggingTagId, setDraggingTagId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isDraggingCarousel, setIsDraggingCarousel] = useState(false);
  const [sheetOffset, setSheetOffset] = useState(0);

  const sheetDragStartY = useRef<number | null>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const didDragRef = useRef(false);
  const carouselStartRef = useRef<{ x: number; y: number; baseScrollX: number } | null>(null);
  const isCarouselDragging = useRef(false);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const raw = sessionStorage.getItem("pendingPhotos");
    sessionStorage.removeItem("pendingPhotos");

    let stored: string[] = [];
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      // Handle both string arrays and object arrays safely
      stored = parsed
        .map((item: any) => (typeof item === "string" ? item : item?.url))
        .filter((url: any) => typeof url === "string" && url.trim() !== "");
    } catch {
      stored = [];
    }

    if (stored.length > 0) {
      setPhotos(stored);
      setTagsByPhoto(stored.map(() => []));
    } else {
      router.replace("/submit/select");
    }
    setLoading(false);

    void (async () => {
      try {
        const r = await fetch("/api/members");
        const data = (await r.json()) as Array<{ _id: string; name: string; team: string }>;
        if (Array.isArray(data) && data.length > 0) {
          setMembers(data.map((m) => ({ id: m._id, name: m.name, team: m.team })));
        }
      } catch {
        /* keep fallback list */
      }
    })();
  }, []);

  useEffect(() => {
    if (!draggingTagId) return;

    function handleGlobalMouseMove(e: MouseEvent) {
      if (!photoRef.current) return;

      const { x, y } = getPercentPosition(e.clientX, e.clientY);

      updateCurrentTags((prev) =>
        prev.map((tag) => (tag.id === draggingTagId ? { ...tag, x, y } : tag)),
      );
    }

    function handleGlobalMouseUp() {
      setDraggingTagId(null);
    }

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [draggingTagId]);

  const allTaggedMembers = useMemo(() => {
    const seen = new Set<string>();
    const result: Tag[] = [];
    for (const tags of tagsByPhoto) {
      for (const tag of tags ?? []) {
        if (!seen.has(tag.memberId)) {
          seen.add(tag.memberId);
          result.push(tag);
        }
      }
    }
    return result;
  }, [tagsByPhoto]);

  const filteredMembers = useMemo(
    () => members.filter((m) => m.name.toLowerCase().includes(search.toLowerCase())),
    [members, search],
  );

  if (loading) return null;

  const currentIdx =
    photos.length === 0
      ? 0
      : Math.max(0, Math.min(photos.length - 1, Math.round(-scrollX / ITEM_WIDTH)));

  function updateCurrentTags(updater: (prev: Tag[]) => Tag[]) {
    setTagsByPhoto((prev) => {
      if (currentIdx < 0 || currentIdx >= prev.length) return prev;

      const next = [...prev];
      next[currentIdx] = updater(next[currentIdx] ?? []);
      return next;
    });
  }

  function getPercentPosition(clientX: number, clientY: number) {
    if (!photoRef.current) return { x: 50, y: 50 };
    const rect = photoRef.current.getBoundingClientRect();
    return {
      x: Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.max(2, Math.min(98, ((clientY - rect.top) / rect.height) * 100)),
    };
  }

  function getPositionInCarousel(clientX: number, clientY: number) {
    if (!carouselContainerRef.current) return null;
    const rect = carouselContainerRef.current.getBoundingClientRect();
    const photoWidth = photoRef.current?.getBoundingClientRect().width || 328;
    const photoHeight = photoRef.current?.getBoundingClientRect().height || 332;

    const contentX = clientX - rect.left - 5 - scrollX;
    const photoIdx = Math.max(0, Math.min(photos.length - 1, Math.floor(contentX / ITEM_WIDTH)));
    const xWithinPhoto = contentX - photoIdx * ITEM_WIDTH;
    const xPercent = Math.max(2, Math.min(98, (xWithinPhoto / photoWidth) * 100));
    const yPercent = Math.max(2, Math.min(98, ((clientY - rect.top) / photoHeight) * 100));
    return { photoIdx, xPercent, yPercent };
  }

  function moveDraggingTag(clientX: number, clientY: number) {
    const pos = getPositionInCarousel(clientX, clientY);
    if (!pos) return;
    const { photoIdx, xPercent, yPercent } = pos;
    setTagsByPhoto((prev) => {
      const fromIdx = prev.findIndex((tags) => tags?.some((t) => t.id === draggingTagId));
      if (fromIdx === -1) return prev;
      const next = prev.map((arr) => [...(arr ?? [])]);
      if (fromIdx === photoIdx) {
        next[photoIdx] = next[photoIdx].map((t) =>
          t.id === draggingTagId ? { ...t, x: xPercent, y: yPercent } : t,
        );
      } else {
        const tag = next[fromIdx].find((t) => t.id === draggingTagId);
        if (!tag) return prev;
        next[fromIdx] = next[fromIdx].filter((t) => t.id !== draggingTagId);
        next[photoIdx] = [...next[photoIdx], { ...tag, x: xPercent, y: yPercent }];
      }
      return next;
    });
  }

  function handlePhotoClick(e: React.MouseEvent<HTMLDivElement>) {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    if ((e.target as HTMLElement).closest("[data-tag]")) return;
    const { x, y } = getPercentPosition(e.clientX, e.clientY);
    setSearch("");
    setPendingTag({ x, y });
  }

  function handlePhotoTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("[data-tag]")) return;
    carouselStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      baseScrollX: scrollX,
    };
    isCarouselDragging.current = false;
  }

  function handlePhotoTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("[data-tag]")) return;

    // 1. Store touch start ref and reset all touch tracking state immediately
    const startRef = carouselStartRef.current;
    carouselStartRef.current = null;
    isCarouselDragging.current = false;
    setIsDraggingCarousel(false);

    // 2. If user dragged/swiped, snap carousel to closest slide and exit
    if (didDragRef.current) {
      didDragRef.current = false;

      const snapIdx = Math.max(0, Math.min(photos.length - 1, Math.round(-scrollX / ITEM_WIDTH)));
      setScrollX(-snapIdx * ITEM_WIDTH);
      return;
    }

    // 3. Handle quick tap gesture for placing tags
    if (!startRef) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - startRef.x;
    const dy = Math.abs(touch.clientY - startRef.y);

    if (Math.abs(dx) < 8 && dy < 8 && photoRef.current) {
      const { x, y } = getPercentPosition(touch.clientX, touch.clientY);
      setSearch("");
      setPendingTag({ x, y });
    }
  }

  function goTo(idx: number) {
    setScrollX(-idx * ITEM_WIDTH);
    setPendingTag(null);
  }

  function handleSelectMember(memberId: string) {
    const member = members.find((m) => m.id === memberId);
    if (!member || !pendingTag) return;
    if (tagsByPhoto.some((tags) => tags?.some((t) => t.memberId === memberId))) return;
    updateCurrentTags((prev) => [
      ...prev,
      {
        id: String(++tagCounter),
        x: pendingTag.x,
        y: pendingTag.y,
        memberId: member.id,
        memberName: member.name,
        isPvp: member.team === "PVP",
      },
    ]);
    setPendingTag(null);
  }

  function handleRemoveMember(memberId: string) {
    setTagsByPhoto((prev) => prev.map((tags) => tags.filter((t) => t.memberId !== memberId)));
  }

  function handleTagMouseDown(e: React.MouseEvent, tagId: string) {
    e.preventDefault();
    e.stopPropagation();
    didDragRef.current = false;
    setDraggingTagId(tagId);
    setPendingTag(null);
  }

  function handleTagTouchStart(e: React.TouchEvent, tagId: string) {
    e.stopPropagation();
    didDragRef.current = false;
    setDraggingTagId(tagId);
    setPendingTag(null);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (draggingTagId && carouselContainerRef.current) {
      didDragRef.current = true;
      const touch = e.touches[0];
      moveDraggingTag(touch.clientX, touch.clientY);
      return;
    }
    if (!carouselStartRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - carouselStartRef.current.x;
    const dy = Math.abs(touch.clientY - carouselStartRef.current.y);
    // bail if clearly a vertical scroll
    if (dy > Math.abs(dx) && !isCarouselDragging.current) return;
    isCarouselDragging.current = true;
    setIsDraggingCarousel(true);
    const newScrollX = Math.max(
      -(photos.length - 1) * ITEM_WIDTH,
      Math.min(0, carouselStartRef.current.baseScrollX + dx),
    );
    setScrollX(newScrollX);
  }

  function handleTagDragTouchEnd() {
    setDraggingTagId(null);
  }

  function handleSheetHandleTouchStart(e: React.TouchEvent) {
    sheetDragStartY.current = e.touches[0].clientY;
  }

  function handleSheetHandleTouchMove(e: React.TouchEvent) {
    if (sheetDragStartY.current === null) return;
    const dy = e.touches[0].clientY - sheetDragStartY.current;
    if (dy > 0) setSheetOffset(dy);
  }

  function handleSheetHandleTouchEnd() {
    sheetDragStartY.current = null;
    if (sheetOffset > 80) {
      setSheetOffset(0);
      setPendingTag(null);
    } else {
      setSheetOffset(0);
    }
  }

  const taggedIds = new Set(allTaggedMembers.map((t) => t.memberId));
  const needMore = Math.max(0, 3 - allTaggedMembers.length);
  const canContinue = photos.length > 0 && allTaggedMembers.length >= 3;

  return (
    <main className={styles.mainContainer}>
      <div className={styles.submissionHeader}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <svg width="9" height="18" viewBox="0 0 9 18" fill="none">
            <path
              d="M8 1L1 9L8 17"
              stroke="rgba(51,54,63,1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.upperBox}>
          <h1 className={styles.submissionFormText}>Submission Form</h1>
          <p className={styles.tagMembersText}> Tag members attended </p>
        </div>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.yellowBar} />
        <div className={styles.whiteBar} />
        <div className={styles.whiteBar} />
      </div>

      <div className={styles.taggingSection}>
        <>
          {/* Carousel container — tags are rendered here so they stay mounted across photo changes */}
          <div
            ref={carouselContainerRef}
            className={styles.carouselContainer}
            onTouchMove={handleTouchMove}
            onTouchEnd={(e) => {
              handleTagDragTouchEnd();
              handlePhotoTouchEnd(e);
            }}
          >
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translateX(${scrollX}px)`,
                transition: draggingTagId || isDraggingCarousel ? "none" : "transform 0.3s ease",
              }}
            >
              {photos.map((photo, i) => (
                <div
                  key={i}
                  className={styles.carouselSlide}
                  style={{
                    cursor:
                      i === currentIdx ? (draggingTagId ? "grabbing" : "crosshair") : "pointer",
                  }}
                  onClick={i === currentIdx ? handlePhotoClick : () => goTo(i)}
                  onTouchStart={(e) => {
                    if ((e.target as HTMLElement).closest("[data-tag]")) return;
                    if (i === currentIdx) handlePhotoTouchStart(e);
                  }}
                >
                  <Image
                    ref={i === currentIdx ? photoRef : null}
                    src={photo}
                    alt={`Event photo ${i + 1}`}
                    fill
                    sizes="328px"
                    className={styles.carouselImage}
                    draggable={false}
                  />

                  {i === currentIdx && pendingTag && (
                    <div
                      data-tag
                      className={styles.pendingTagMarker}
                      style={{
                        left: `${pendingTag.x}%`,
                        top: `${pendingTag.y}%`,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* All tags rendered flat here so their DOM elements survive cross-photo moves */}
            {tagsByPhoto.flatMap((tags, photoIdx) =>
              (tags ?? []).map((tag) => {
                const left = 5 + scrollX + photoIdx * ITEM_WIDTH + (tag.x / 100) * 328;
                const top = (tag.y / 100) * 332;
                return (
                  <div
                    key={tag.id}
                    data-tag
                    className={styles.tagMarker}
                    style={{
                      left,
                      top,
                      cursor: draggingTagId === tag.id ? "grabbing" : "grab",
                    }}
                    onMouseDown={(e) => handleTagMouseDown(e, tag.id)}
                    onTouchStart={(e) => handleTagTouchStart(e, tag.id)}
                  >
                    <div className={styles.tagLabel}>
                      {tag.isPvp && <span className={styles.pvpTag}>PP</span>}
                      <span>{tag.memberName}</span>
                    </div>
                    <div className={styles.tagDot} />
                  </div>
                );
              }),
            )}
          </div>

          <div className={styles.tagInstructionsSection}>
            <div className={styles.tagInstructions}>
              <p className={styles.tagInstructionsText}>Tap photo to tag people.</p>
              {needMore > 0 && (
                <p className={styles.needMoreText}>
                  [add ≥ {needMore} member{needMore !== 1 ? "s" : ""} more!]
                </p>
              )}
            </div>
          </div>

          {allTaggedMembers.length > 0 && (
            <div className={styles.taggedMembersList}>
              {allTaggedMembers.map((tag) => {
                const member = members.find((m) => m.id === tag.memberId);
                return (
                  <div key={tag.memberId} className={styles.taggedMemberRow}>
                    <div className={styles.memberIdentity}>
                      <div className={styles.taggedMemberAvatar}>
                        {tag.memberName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <span className={styles.taggedMemberName}>{tag.memberName}</span>
                    </div>
                    <div className={styles.teamBadge}>
                      <span className={styles.teamText}>{member?.team ?? ""}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      </div>

      {pendingTag && (
        <div className={styles.bottomSheetOverlay} onClick={() => setPendingTag(null)}>
          <div
            className={styles.bottomSheet}
            style={{
              transform: `translateY(${sheetOffset}px)`,
              transition: sheetOffset === 0 ? "transform 0.3s ease" : "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={styles.sheetHandleArea}
              onTouchStart={handleSheetHandleTouchStart}
              onTouchMove={handleSheetHandleTouchMove}
              onTouchEnd={handleSheetHandleTouchEnd}
            >
              <div className={styles.sheetHandle} />
            </div>

            <div className={styles.searchHeader}>
              <div className={styles.searchBox}>
                <div className={styles.searchContent}>
                  <svg className={styles.searchIcon} fill="none" viewBox="0 0 20 20">
                    <circle cx="8.5" cy="8.5" r="7.5" stroke="rgba(34,34,34,1)" strokeWidth="2" />
                    <path
                      d="M14 14L18 18"
                      stroke="rgba(34,34,34,1)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    autoFocus
                    placeholder="Search for a person"
                    className={styles.searchInput}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button onClick={() => setPendingTag(null)} className={styles.closeSearchButton}>
                    <svg className={styles.closeIcon} fill="none" viewBox="0 0 13 13">
                      <line
                        x1="0"
                        y1="0"
                        x2="13"
                        y2="13"
                        stroke="rgba(34,34,34,1)"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                      <line
                        x1="13"
                        y1="0"
                        x2="0"
                        y2="13"
                        stroke="rgba(34,34,34,1)"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.memberResults}>
              {filteredMembers.length === 0 ? (
                <p className={styles.noMembersFound}>No members found</p>
              ) : (
                filteredMembers.map((m) => {
                  const isTagged = taggedIds.has(m.id);
                  return (
                    <div key={m.id} className={styles.memberResultRow}>
                      <div className={styles.resultAvatar}>
                        <span className={styles.resultInitials}>
                          {m.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div className={styles.resultMemberInfo}>
                        <span className={styles.resultMemberName}>{m.name}</span>
                        {m.team === "PVP" && <span className={styles.pvpIndicator}>PVP</span>}
                      </div>
                      <button
                        className={styles.memberActionButton}
                        style={{
                          background: isTagged ? "#DEBB01" : "rgba(255,255,255,1)",
                        }}
                        onClick={() =>
                          isTagged ? handleRemoveMember(m.id) : handleSelectMember(m.id)
                        }
                      >
                        <span className={styles.memberActionText}>
                          {isTagged ? "Added" : "Add"}
                        </span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      <div className={styles.nextButtonWrapper}>
        <button
          disabled={!canContinue}
          onClick={() => router.push("/submit/event-info")}
          className={styles.nextButton}
          style={{
            opacity: canContinue ? 1 : 0.4,
            cursor: canContinue ? "pointer" : "default",
          }}
        >
          <span className={styles.nextButtonText}>Next</span>
        </button>
      </div>
    </main>
  );
}
