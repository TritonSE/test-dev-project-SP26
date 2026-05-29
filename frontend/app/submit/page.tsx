"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Member = { id: string; name: string; team: string };

const FALLBACK_MEMBERS: Member[] = [
  // PVP
  { id: "1", name: "Benjamin Johnson", team: "PVP" },
  { id: "2", name: "Nancy Liu", team: "PVP" },
  { id: "3", name: "Eshaan Sharma", team: "PVP" },
  { id: "4", name: "Sur Shah", team: "PVP" },
  { id: "5", name: "Nandini Desai", team: "PVP" },
  { id: "6", name: "Yixuan Li", team: "PVP" },
  // CRED
  { id: "7", name: "Irene Joo", team: "CRED" },
  { id: "8", name: "Alice Lan", team: "CRED" },
  { id: "9", name: "Andrea Labbaika", team: "CRED" },
  { id: "10", name: "Aaryan Patel", team: "CRED" },
  { id: "11", name: "Anirudh Annabathula", team: "CRED" },
  { id: "12", name: "Jeff Umanzor", team: "CRED" },
  { id: "13", name: "Jenny Zhu", team: "CRED" },
  { id: "14", name: "Jerry Zhang", team: "CRED" },
  { id: "15", name: "Kalyssa Choy", team: "CRED" },
  { id: "16", name: "Nico Docena", team: "CRED" },
  { id: "17", name: "Rushil Gupta", team: "CRED" },
  { id: "18", name: "Ketan Mittal", team: "CRED" },
  { id: "19", name: "Luis Marquez", team: "CRED" },
  // DBC
  { id: "20", name: "Vivian Liu", team: "DBC" },
  { id: "21", name: "Kate Songpetchmongkol", team: "DBC" },
  { id: "22", name: "Caleb Kim", team: "DBC" },
  { id: "23", name: "Jamie Han", team: "DBC" },
  { id: "24", name: "Darshika Mishra", team: "DBC" },
  { id: "25", name: "Edward Millan", team: "DBC" },
  { id: "26", name: "Hoang Anh Pham", team: "DBC" },
  { id: "27", name: "Ishayu Ghosh", team: "DBC" },
  { id: "28", name: "Jeremy Lim", team: "DBC" },
  { id: "29", name: "JP Davalos", team: "DBC" },
  { id: "30", name: "Ming Lu", team: "DBC" },
  { id: "31", name: "Rudraksh Bhandari", team: "DBC" },
  { id: "32", name: "Jordan Junaidi", team: "DBC" },
  { id: "33", name: "Brandon Jonathan", team: "DBC" },
  // F3
  { id: "34", name: "Alice Guo", team: "F3" },
  { id: "35", name: "Sylvie Tran", team: "F3" },
  { id: "36", name: "Jeffrey Antony", team: "F3" },
  { id: "37", name: "Jaden Huang", team: "F3" },
  { id: "38", name: "James Escobedo", team: "F3" },
  { id: "39", name: "Katelyn Li", team: "F3" },
  { id: "40", name: "Munachi Okoro", team: "F3" },
  { id: "41", name: "Suhaan Khurana", team: "F3" },
  { id: "42", name: "Sweekrit Bhatnagar", team: "F3" },
  { id: "43", name: "Yasmin Kabir", team: "F3" },
  { id: "44", name: "Weston Zong", team: "F3" },
  { id: "45", name: "Annabelle Guiditta", team: "F3" },
  // Fulcrum
  { id: "46", name: "Allison Huang", team: "Fulcrum" },
  { id: "47", name: "Kristen Lee", team: "Fulcrum" },
  { id: "48", name: "Hillary Co", team: "Fulcrum" },
  { id: "49", name: "Annabelle Zhou", team: "Fulcrum" },
  { id: "50", name: "Aniket Warty", team: "Fulcrum" },
  { id: "51", name: "Huize Mao", team: "Fulcrum" },
  { id: "52", name: "Pranav Puttagunta", team: "Fulcrum" },
  { id: "53", name: "Raghav Sreekumar", team: "Fulcrum" },
  { id: "54", name: "Shashwat Bhandari", team: "Fulcrum" },
  { id: "55", name: "Sungwoo Cho", team: "Fulcrum" },
  { id: "56", name: "William Wu", team: "Fulcrum" },
  { id: "57", name: "Yifei Xue", team: "Fulcrum" },
  { id: "58", name: "Philip Chen", team: "Fulcrum" },
  { id: "59", name: "Srikar Eranky", team: "Fulcrum" },
  // HomeStart
  { id: "60", name: "Renato Pimentel", team: "HomeStart" },
  { id: "61", name: "Joyce Ren", team: "HomeStart" },
  { id: "62", name: "Charlie Suarez Robles", team: "HomeStart" },
  { id: "63", name: "Edward Yao", team: "HomeStart" },
  { id: "64", name: "Jeffrey Liu", team: "HomeStart" },
  { id: "65", name: "Koji Nakazawa", team: "HomeStart" },
  { id: "66", name: "Lulu Shao", team: "HomeStart" },
  { id: "67", name: "Michael Wang", team: "HomeStart" },
  { id: "68", name: "Nate Murphy", team: "HomeStart" },
  { id: "69", name: "Yuzuki Tomioka", team: "HomeStart" },
  { id: "70", name: "Navyaa Gupta", team: "HomeStart" },
  { id: "71", name: "Karen Yan", team: "HomeStart" },
  // Meemli
  { id: "72", name: "Liam Lai", team: "Meemli" },
  { id: "73", name: "Ivan Rim", team: "Meemli" },
  { id: "74", name: "Evan Chen", team: "Meemli" },
  { id: "75", name: "Alyssia Almanza", team: "Meemli" },
  { id: "76", name: "Himir Desai", team: "Meemli" },
  { id: "77", name: "Isabel Ku", team: "Meemli" },
  { id: "78", name: "Lucas Yan", team: "Meemli" },
  { id: "79", name: "Michael Sullivan", team: "Meemli" },
  { id: "80", name: "Yoto Kim", team: "Meemli" },
  // TEST
  { id: "81", name: "Rohaan Sandhu", team: "TEST" },
  { id: "82", name: "Thomas Rocha", team: "TEST" },
  { id: "83", name: "Jesus Azpitarte", team: "TEST" },
  { id: "84", name: "Alexis Vega", team: "TEST" },
  { id: "85", name: "Alice Park", team: "TEST" },
  { id: "86", name: "Angeleen Duong", team: "TEST" },
  { id: "87", name: "Isaac Montanez", team: "TEST" },
  { id: "88", name: "Sofia Heim", team: "TEST" },
  { id: "89", name: "Tony Wang", team: "TEST" },
  { id: "90", name: "Thy Doan", team: "TEST" },
  { id: "91", name: "Waleed Siddiqui", team: "TEST" },
  { id: "92", name: "Alice Guo", team: "TEST" },
  { id: "93", name: "David Nguyen", team: "TEST" },
  { id: "94", name: "Juee Deshmukh", team: "TEST" },
  { id: "95", name: "Sakura Nishikawa", team: "TEST" },
  { id: "96", name: "Yang Zheng", team: "TEST" },
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

const ITEM_WIDTH = 343; // 328px photo + 15px gap

export default function SubmitPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>(FALLBACK_MEMBERS);
  const [photos, setPhotos] = useState<string[]>([]);
  const [scrollX, setScrollX] = useState(0);
  const [tagsByPhoto, setTagsByPhoto] = useState<Tag[][]>([]);
  const [pendingTag, setPendingTag] = useState<{ x: number; y: number } | null>(null);
  const [draggingTagId, setDraggingTagId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isDraggingCarousel, setIsDraggingCarousel] = useState(false);
  const [sheetOffset, setSheetOffset] = useState(0);

  const sheetDragStartY = useRef<number | null>(null);
  const photoRef = useRef<HTMLDivElement>(null);
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
    const stored = (raw ? JSON.parse(raw) : []) as string[];
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
      const next = [...prev];
      next[currentIdx] = updater(next[currentIdx] ?? []);
      return next;
    });
  }

  function getPercentPosition(clientX: number, clientY: number) {
    const rect = photoRef.current!.getBoundingClientRect();
    return {
      x: Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.max(2, Math.min(98, ((clientY - rect.top) / rect.height) * 100)),
    };
  }

  function getPositionInCarousel(clientX: number, clientY: number) {
    if (!carouselContainerRef.current) return null;
    const rect = carouselContainerRef.current.getBoundingClientRect();
    const contentX = clientX - rect.left - 5 - scrollX;
    const photoIdx = Math.max(0, Math.min(photos.length - 1, Math.floor(contentX / ITEM_WIDTH)));
    const xWithinPhoto = contentX - photoIdx * ITEM_WIDTH;
    const xPercent = Math.max(2, Math.min(98, (xWithinPhoto / 328) * 100));
    const yPercent = Math.max(2, Math.min(98, ((clientY - rect.top) / 332) * 100));
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
    if (didDragRef.current) {
      didDragRef.current = false;
      isCarouselDragging.current = false;
      setIsDraggingCarousel(false);
      return;
    }
    if (!carouselStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - carouselStartRef.current.x;
    const dy = Math.abs(touch.clientY - carouselStartRef.current.y);
    carouselStartRef.current = null;
    isCarouselDragging.current = false;
    setIsDraggingCarousel(false);

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

  function handleMouseMove(e: React.MouseEvent) {
    if (!draggingTagId) return;
    didDragRef.current = true;
    moveDraggingTag(e.clientX, e.clientY);
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
    <main
      className="relative flex flex-col bg-white w-full max-w-[402px] min-h-[874px] mx-auto overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
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
          onClick={() => router.back()}
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
        <>
          {/* Carousel container — tags are rendered here so they stay mounted across photo changes */}
          <div
            ref={carouselContainerRef}
            style={{ position: "relative", marginLeft: 34, overflow: "hidden", height: 334 }}
            onTouchMove={handleTouchMove}
            onTouchEnd={(e) => {
              handleTagDragTouchEnd();
              handlePhotoTouchEnd(e);
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 15,
                paddingLeft: 5,
                height: 334,
                transform: `translateX(${scrollX}px)`,
                transition: draggingTagId || isDraggingCarousel ? "none" : "transform 0.3s ease",
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
                  onTouchStart={(e) => {
                    if ((e.target as HTMLElement).closest("[data-tag]")) return;
                    if (i === currentIdx) handlePhotoTouchStart(e);
                  }}
                >
                  <img
                    src={photo}
                    alt={`Event photo ${i + 1}`}
                    style={{ width: 328, height: 332, objectFit: "cover", display: "block" }}
                    draggable={false}
                  />

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

            {/* All tags rendered flat here so their DOM elements survive cross-photo moves */}
            {tagsByPhoto.flatMap((tags, photoIdx) =>
              (tags ?? []).map((tag) => {
                const left = 5 + scrollX + photoIdx * ITEM_WIDTH + (tag.x / 100) * 328;
                const top = (tag.y / 100) * 332;
                return (
                  <div
                    key={tag.id}
                    data-tag
                    className="absolute flex flex-col items-center select-none"
                    style={{
                      left,
                      top,
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
                        <span className="text-[#DEBB01] text-[10px] font-bold mr-0.5">PVP</span>
                      )}
                      <span>{tag.memberName}</span>
                    </div>
                    <div className="w-2 h-2 bg-white rounded-full shadow mt-0.5" />
                  </div>
                );
              }),
            )}
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
                maxHeight: 180,
                overflowY: "auto",
              }}
            >
              {allTaggedMembers.map((tag) => {
                const member = members.find((m) => m.id === tag.memberId);
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
                height: 88,
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
          ></span>
        </button>
      </div>
    </main>
  );
}
