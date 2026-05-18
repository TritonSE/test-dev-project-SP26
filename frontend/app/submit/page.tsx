"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

// TODO: replace with GET /api/members
const TSE_MEMBERS = [
  { id: "1", name: "Nancy Liu", team: "PVP" },
  { id: "2", name: "Karen Yan", team: "HomeStar" },
  { id: "3", name: "Vivian Liu", team: "DBC" },
  { id: "4", name: "Alex Chen", team: "F3 Global" },
  { id: "5", name: "Priya Patel", team: "CRED" },
  { id: "6", name: "Jordan Smith", team: "PVP" },
  { id: "7", name: "Maya Johnson", team: "HomeStar" },
  { id: "8", name: "Tyler Davis", team: "DBC" },
  { id: "9", name: "Sophie Williams", team: "F3 Global" },
  { id: "10", name: "Marcus Brown", team: "CRED" },
];

type Tag = {
  id: string;
  x: number;
  y: number;
  memberId: string;
  memberName: string;
  isPvp: boolean;
};

let tagCounter = 0;

export default function SubmitPage() {
  const router = useRouter();

  const [photos, setPhotos] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [tagsByPhoto, setTagsByPhoto] = useState<Tag[][]>([]);
  const [pendingTag, setPendingTag] = useState<{ x: number; y: number } | null>(null);
  const [draggingTagId, setDraggingTagId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [dragOffset, setDragOffset] = useState(0);
  const [sheetOffset, setSheetOffset] = useState(0);

  const sheetDragStartY = useRef<number | null>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const didDragRef = useRef(false);
  const carouselStartRef = useRef<{ x: number; y: number } | null>(null);
  const isCarouselDragging = useRef(false);

  const currentTags: Tag[] = tagsByPhoto[currentIdx] ?? [];

  function updateCurrentTags(updater: (prev: Tag[]) => Tag[]) {
    setTagsByPhoto((prev) => {
      const next = [...prev];
      next[currentIdx] = updater(next[currentIdx] ?? []);
      return next;
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const urls = files.map((f) => URL.createObjectURL(f));
    setPhotos(urls);
    setCurrentIdx(0);
    setTagsByPhoto(urls.map(() => []));
    setPendingTag(null);
  }

  function getPercentPosition(clientX: number, clientY: number) {
    const rect = photoRef.current!.getBoundingClientRect();
    return {
      x: Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.max(2, Math.min(98, ((clientY - rect.top) / rect.height) * 100)),
    };
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
    carouselStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    isCarouselDragging.current = false;
  }

  function handlePhotoTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("[data-tag]")) return;
    if (didDragRef.current) {
      didDragRef.current = false;
      setDragOffset(0);
      isCarouselDragging.current = false;
      return;
    }
    if (!carouselStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - carouselStartRef.current.x;
    const dy = Math.abs(touch.clientY - carouselStartRef.current.y);
    carouselStartRef.current = null;
    isCarouselDragging.current = false;
    setDragOffset(0);

    if (Math.abs(dx) > 40 && dy < 35) {
      if (dx < 0 && currentIdx < photos.length - 1) {
        setCurrentIdx((i) => i + 1);
        setPendingTag(null);
      } else if (dx > 0 && currentIdx > 0) {
        setCurrentIdx((i) => i - 1);
        setPendingTag(null);
      }
      return;
    }

    if (Math.abs(dx) < 8 && dy < 8 && photoRef.current) {
      const { x, y } = getPercentPosition(touch.clientX, touch.clientY);
      setSearch("");
      setPendingTag({ x, y });
    }
  }

  function goTo(idx: number) {
    setCurrentIdx(idx);
    setPendingTag(null);
  }

  function handleSelectMember(memberId: string) {
    const member = TSE_MEMBERS.find((m) => m.id === memberId);
    if (!member || !pendingTag) return;
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
  }

  function removeTag(tagId: string, e: React.MouseEvent) {
    e.stopPropagation();
    updateCurrentTags((prev) => prev.filter((t) => t.id !== tagId));
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

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!draggingTagId || !photoRef.current) return;
    didDragRef.current = true;
    const { x, y } = getPercentPosition(e.clientX, e.clientY);
    updateCurrentTags((prev) => prev.map((t) => (t.id === draggingTagId ? { ...t, x, y } : t)));
  }

  function handleMouseUp() {
    setDraggingTagId(null);
  }

  function handleTagTouchStart(e: React.TouchEvent, tagId: string) {
    e.stopPropagation();
    didDragRef.current = false;
    setDraggingTagId(tagId);
    setPendingTag(null);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (draggingTagId && photoRef.current) {
      didDragRef.current = true;
      const touch = e.touches[0];
      const { x, y } = getPercentPosition(touch.clientX, touch.clientY);
      updateCurrentTags((prev) => prev.map((t) => (t.id === draggingTagId ? { ...t, x, y } : t)));
      return;
    }
    if (!carouselStartRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - carouselStartRef.current.x;
    const dy = Math.abs(touch.clientY - carouselStartRef.current.y);
    // bail if clearly a vertical scroll
    if (dy > Math.abs(dx) && !isCarouselDragging.current) return;
    isCarouselDragging.current = true;
    setDragOffset(dx);
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

  const taggedIds = new Set(allTaggedMembers.map((t) => t.memberId));
  const filteredMembers = useMemo(
    () => TSE_MEMBERS.filter((m) => m.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );
  const needMore = Math.max(0, 3 - allTaggedMembers.length);
  const canContinue = photos.length > 0 && allTaggedMembers.length >= 3;

  return (
    <main className="relative flex flex-col bg-white w-full max-w-[402px] min-h-[874px] mx-auto overflow-hidden">
      <div style={{ position: "relative", marginTop: 58, marginLeft: 35, width: 313, height: 77 }}>
        <button
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 9,
            height: 18,
            padding: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            if (photos.length > 0) {
              setPhotos([]);
              setTagsByPhoto([]);
              setCurrentIdx(0);
              setPendingTag(null);
            } else {
              router.back();
            }
          }}
        >
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

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 113 - 35,
            width: 178,
            height: 52,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 9,
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 600,
              fontSize: 20,
              lineHeight: "100%",
              letterSpacing: 0,
              textAlign: "center",
              color: "rgba(21,54,65,1)",
              margin: 0,
              height: 24,
            }}
          >
            Submission Form
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "100%",
              letterSpacing: 0,
              textAlign: "center",
              color: "rgba(103,138,150,1)",
              margin: 0,
              height: 19,
            }}
          >
            Tag members attended
          </p>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 129,
          left: "calc(50% - 123px)",
          height: 6,
          display: "flex",
          gap: 6,
        }}
      >
        <div style={{ width: 78, height: 6, borderRadius: 10, background: "rgba(222,187,1,1)" }} />
        <div
          style={{ width: 78, height: 6, borderRadius: 10, background: "rgba(238,232,215,1)" }}
        />
        <div
          style={{ width: 78, height: 6, borderRadius: 10, background: "rgba(238,232,215,1)" }}
        />
      </div>

      <div style={{ marginTop: 22, display: "flex", flexDirection: "column" }}>
        {photos.length === 0 ? (
          <label
            htmlFor="photo-upload"
            className="mx-[24px] rounded-2xl bg-[#F5F5F5] flex flex-col items-center justify-center gap-3 h-[332px] active:bg-gray-200 transition-colors w-[calc(100%-48px)]"
            style={{ cursor: "pointer" }}
          >
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-600">Upload photos</p>
              <p className="text-xs text-gray-400 mt-0.5">Tap to open your camera roll</p>
            </div>
          </label>
        ) : (
          <>
            <div style={{ marginLeft: 34, overflow: "hidden", height: 334 }}>
              <div
                style={{
                  display: "flex",
                  gap: 15,
                  paddingLeft: 5,
                  height: 334,
                  transform: `translateX(${currentIdx * -(328 + 15) + dragOffset}px)`,
                  transition: draggingTagId || dragOffset !== 0 ? "none" : "transform 0.3s ease",
                }}
              >
                {photos.map((photo, i) => (
                  <div
                    key={i}
                    ref={i === currentIdx ? photoRef : null}
                    className="relative select-none flex-shrink-0"
                    style={{
                      width: 328,
                      height: 332,
                      cursor:
                        i === currentIdx ? (draggingTagId ? "grabbing" : "crosshair") : "pointer",
                      overflow: "visible",
                    }}
                    onClick={i === currentIdx ? handlePhotoClick : () => goTo(i)}
                    onMouseMove={i === currentIdx ? handleMouseMove : undefined}
                    onMouseUp={i === currentIdx ? handleMouseUp : undefined}
                    onMouseLeave={i === currentIdx ? handleMouseUp : undefined}
                    onTouchStart={i === currentIdx ? handlePhotoTouchStart : undefined}
                    onTouchMove={i === currentIdx ? handleTouchMove : undefined}
                    onTouchEnd={
                      i === currentIdx
                        ? (e) => {
                            handleTagDragTouchEnd();
                            handlePhotoTouchEnd(e);
                          }
                        : undefined
                    }
                  >
                    <img
                      src={photo}
                      alt={`Event photo ${i + 1}`}
                      style={{ width: 328, height: 332, objectFit: "cover", display: "block" }}
                      draggable={false}
                    />

                    {i === currentIdx &&
                      currentTags.map((tag) => (
                        <div
                          key={tag.id}
                          data-tag
                          className="absolute flex flex-col items-center"
                          style={{
                            left: `${tag.x}%`,
                            top: `${tag.y}%`,
                            transform: "translate(-50%, -100%)",
                            cursor: draggingTagId === tag.id ? "grabbing" : "grab",
                            zIndex: 10,
                          }}
                          onMouseDown={(e) => handleTagMouseDown(e, tag.id)}
                          onTouchStart={(e) => handleTagTouchStart(e, tag.id)}
                        >
                          <div
                            className="flex items-center gap-1 text-white text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg"
                            style={{ background: "#606060", mixBlendMode: "multiply" }}
                          >
                            {tag.isPvp && (
                              <span className="text-[#DEBB01] text-[10px] font-bold mr-0.5">
                                PVP
                              </span>
                            )}
                            <span>{tag.memberName}</span>
                            <button
                              className="text-white/60 hover:text-white text-sm leading-none ml-0.5"
                              onMouseDown={(e) => e.stopPropagation()}
                              onTouchStart={(e) => e.stopPropagation()}
                              onClick={(e) => removeTag(tag.id, e)}
                            >
                              ×
                            </button>
                          </div>
                          <div className="w-2 h-2 bg-white rounded-full shadow mt-0.5" />
                        </div>
                      ))}

                    {i === currentIdx && pendingTag && (
                      <div
                        data-tag
                        className="absolute w-3 h-3 rounded-full border-2 border-white bg-white/40 pointer-events-none"
                        style={{
                          left: `${pendingTag.x}%`,
                          top: `${pendingTag.y}%`,
                          transform: "translate(-50%,-50%)",
                          zIndex: 10,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                width: 402,
                height: 65,
                marginTop: 31,
                borderTop: "1px solid #B7B7B7",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 192.64,
                  height: 45,
                  top: 20,
                  left: 106.15,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 11,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: "100%",
                    letterSpacing: 0,
                    textAlign: "center",
                    color: "#606060",
                    margin: 0,
                    width: 192.64,
                    height: 19,
                  }}
                >
                  Tap photo to tag people.
                </p>
                {needMore > 0 && (
                  <p
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      lineHeight: "100%",
                      letterSpacing: "0.04em",
                      color: "#C3C3C3",
                      margin: 0,
                      width: 144,
                      height: 15,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    [add ≥ {needMore} member{needMore !== 1 ? "s" : ""} more!]
                  </p>
                )}
              </div>
            </div>

            {allTaggedMembers.length > 0 && (
              <div
                style={{
                  marginLeft: 24,
                  marginRight: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  marginTop: 12,
                }}
              >
                {allTaggedMembers.map((tag) => {
                  const member = TSE_MEMBERS.find((m) => m.id === tag.memberId);
                  return (
                    <div
                      key={tag.memberId}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "#D1D5DB",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#4B5563",
                            flexShrink: 0,
                          }}
                        >
                          {tag.memberName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <span
                          style={{
                            fontFamily: "var(--font-inter), Inter, sans-serif",
                            fontWeight: 400,
                            fontSize: 13,
                            lineHeight: "100%",
                            letterSpacing: 0,
                            color: "rgba(31,31,31,1)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {tag.memberName}
                        </span>
                      </div>
                      <div
                        style={{
                          width: 88,
                          height: 31,
                          borderRadius: 100,
                          border: "2px solid rgba(222,187,1,1)",
                          background: "rgba(255,255,255,1)",
                          paddingTop: 8,
                          paddingBottom: 7,
                          paddingLeft: 31,
                          paddingRight: 31,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          boxSizing: "border-box",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-rubik), Rubik, sans-serif",
                            fontWeight: 400,
                            fontSize: 12,
                            lineHeight: "100%",
                            letterSpacing: 0,
                            color: "rgba(31,31,31,1)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {member?.team ?? ""}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {pendingTag && (
        <div
          className="absolute z-40 flex flex-col"
          style={{ top: 510, bottom: 0, left: 0, right: 0 }}
          onClick={() => setPendingTag(null)}
        >
          <div
            className="bg-[#0C2B35] pb-8 flex flex-col overflow-y-auto flex-1"
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              transform: `translateY(${sheetOffset}px)`,
              transition: sheetOffset === 0 ? "transform 0.3s ease" : "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 10,
                paddingBottom: 4,
                flexShrink: 0,
                cursor: "grab",
                touchAction: "none",
              }}
              onTouchStart={handleSheetHandleTouchStart}
              onTouchMove={handleSheetHandleTouchMove}
              onTouchEnd={handleSheetHandleTouchEnd}
            >
              <div
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.25)",
                }}
              />
            </div>

            <div
              style={{
                width: 402,
                height: 98,
                flexShrink: 0,
                position: "sticky",
                top: 0,
                zIndex: 1,
                background: "linear-gradient(180deg, #0C2B35 50%, rgba(12,43,53,0) 100%)",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                display: "flex",
                alignItems: "flex-start",
                paddingTop: 13,
              }}
            >
              <div
                style={{
                  width: 354,
                  height: 50,
                  marginLeft: 22,
                  borderRadius: 20,
                  background: "#D9D9D9",
                  display: "flex",
                  alignItems: "center",
                  paddingTop: 13,
                  paddingBottom: 14,
                  paddingLeft: 21,
                  paddingRight: 16,
                  gap: 10,
                  flexShrink: 0,
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{ width: 325, height: 24, display: "flex", alignItems: "center", gap: 10 }}
                >
                  <svg
                    style={{ width: 20, height: 20, flexShrink: 0 }}
                    fill="none"
                    viewBox="0 0 20 20"
                  >
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
                    style={{
                      flex: 1,
                      background: "transparent",
                      color: "#000000",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: "100%",
                      letterSpacing: 0,
                      outline: "none",
                      border: "none",
                      caretColor: "rgba(0,0,0,1)",
                    }}
                    className="placeholder:text-black/50"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    onClick={() => setPendingTag(null)}
                    style={{
                      width: 36,
                      height: 24,
                      borderRadius: 18,
                      padding: 9,
                      flexShrink: 0,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxSizing: "border-box",
                      marginRight: -8,
                    }}
                  >
                    <svg style={{ width: 13, height: 13 }} fill="none" viewBox="0 0 13 13">
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

            <div
              style={{
                width: 351,
                marginLeft: 23,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {filteredMembers.length === 0 ? (
                <p className="text-gray-400 text-sm py-4 text-center">No members found</p>
              ) : (
                filteredMembers.map((m) => {
                  const isTagged = taggedIds.has(m.id);
                  return (
                    <div
                      key={m.id}
                      style={{
                        width: 351,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "#4B5563",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-inter), Inter, sans-serif",
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#fff",
                          }}
                        >
                          {m.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div style={{ flex: 1, marginLeft: 10 }}>
                        <span
                          style={{
                            fontFamily: "var(--font-inter), Inter, sans-serif",
                            fontWeight: 400,
                            fontSize: 13,
                            lineHeight: "100%",
                            letterSpacing: 0,
                            color: "rgba(255,255,255,1)",
                          }}
                        >
                          {m.name}
                        </span>
                        {m.team === "PVP" && (
                          <span
                            style={{
                              marginLeft: 6,
                              fontSize: 10,
                              fontWeight: 700,
                              color: "#DEBB01",
                            }}
                          >
                            PVP
                          </span>
                        )}
                      </div>
                      <button
                        style={{
                          width: 88,
                          height: 29,
                          borderRadius: 100,
                          paddingTop: 8,
                          paddingRight: 31,
                          paddingBottom: 7,
                          paddingLeft: 31,
                          background: isTagged ? "#DEBB01" : "rgba(255,255,255,1)",
                          cursor: "pointer",
                          border: "none",
                          flexShrink: 0,
                          boxSizing: "border-box",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() =>
                          isTagged ? handleRemoveMember(m.id) : handleSelectMember(m.id)
                        }
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-rubik), Rubik, sans-serif",
                            fontWeight: 400,
                            fontSize: 12,
                            lineHeight: "100%",
                            letterSpacing: 0,
                            color: "rgba(31,31,31,1)",
                            whiteSpace: "nowrap",
                          }}
                        >
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

      <div style={{ position: "absolute", width: 163, height: 100, top: 770, left: 225 }}>
        <button
          disabled={!canContinue}
          onClick={() => router.push("/submit/event-info")}
          style={{
            position: "absolute",
            width: 131,
            height: 48,
            top: 26,
            left: 16,
            borderRadius: 100,
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 25,
            paddingRight: 25,
            background: "#000000",
            border: "none",
            opacity: canContinue ? 1 : 0.4,
            cursor: canContinue ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 600,
              fontSize: 20,
              lineHeight: "100%",
              letterSpacing: 0,
              color: "#FFFFFF",
            }}
          >
            Next
          </span>
        </button>
      </div>

      {/* input is offscreen (not display:none) so iOS allows label-triggered file picker */}
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ position: "fixed", top: -200, left: -200, width: 1, height: 1 }}
      />
    </main>
  );
}
