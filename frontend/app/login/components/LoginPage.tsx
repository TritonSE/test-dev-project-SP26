"use client";

/* eslint-disable perfectionist/sort-imports, import/order */
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BackIcon from "@/public/ep_back.svg";
import DropdownArrow from "@/public/Vector.svg";

import styles from "./LoginPage.module.css";
/* eslint-enable perfectionist/sort-imports, import/order */

type Member = {
  name: string;
  [key: string]: unknown;
  _id: string;
};

// Simple helper type to safely handle Next.js static asset imports
type StaticImageData = { src: string; height: number; width: number; blurDataURL?: string };

// Add props type
type LoginPageProps = {
  onBack?: () => void;
};

export default function LoginPage({ onBack }: LoginPageProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [_selectedName, setSelectedName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetch("/api/members");
        if (!res.ok) {
          throw new Error("Failed to fetch members");
        }
        const data = (await res.json()) as Member[];
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }

    void loadMembers();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (
        !target.closest(`.${styles.dropdownWrapper}`) &&
        !target.closest(`.${styles.dropdownList}`)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setDropdownOpen(false);
    }
  }, [searchTerm]);

  const uniqueMembers = Array.from(new Map(members.map((m) => [m._id, m])).values());

  const filteredMembers = uniqueMembers.filter((m) => {
    const fullName = m.name.toLowerCase().trim();
    const search = searchTerm.toLowerCase().trim();
    return fullName.startsWith(search);
  });

  const handleContinue = () => {
    if (!searchTerm.trim()) return;

    router.push(`/welcome?name=${encodeURIComponent(searchTerm)}`);
  };

  const handleBack = () => {
    if (onBack) {
      onBack(); // Call the onBack prop if provided
    } else {
      router.push("/login"); // Fallback to route navigation
    }
  };

  return (
    <main className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        <Image src={BackIcon as StaticImageData} alt="back" />
      </button>

      <div className={styles.layoutWrapper}>
        <div className={styles.headerSection}>
          <Image
            src="/tseLogo.png"
            alt="TSE Logo"
            width={356}
            height={286}
            className={styles.tseLogo}
          />
          <h1 className={styles.orgTitle}>Triton Software Engineering</h1>
          <p className={styles.orgSubtitle}>Track Social Points Easier</p>
        </div>

        <div className={styles.inputCard}>
          <span className={styles.label}>Name</span>
          <div className={styles.dropdownWrapper}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`${styles.inputBox} ${dropdownOpen ? styles.inputBoxOpen : ""}`}
            >
              <input
                type="text"
                placeholder="John Doe"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  setDropdownOpen(value.length > 0);
                }}
                className={styles.input}
              />

              <Image
                src={DropdownArrow as StaticImageData}
                alt="dropdown arrow"
                className={`${styles.dropdownArrow} ${!dropdownOpen ? styles.arrowOpen : ""}`}
              />

              <span className={`${styles.helper} ${dropdownOpen ? styles.helperHidden : ""}`}>
                Enter your name
              </span>
            </div>
            {dropdownOpen && (
              <div className={`${styles.dropdownList} ${styles.dropdownOpen}`}>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((m) => (
                    <button
                      key={m._id}
                      onClick={() => {
                        setSelectedName(m.name);
                        setSearchTerm(m.name);
                        setDropdownOpen(false);
                      }}
                      className={styles.dropdownItem}
                    >
                      {m.name}
                    </button>
                  ))
                ) : (
                  <div className={styles.noResults}>No matching names</div>
                )}
              </div>
            )}
          </div>
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
    </main>
  );
}
