"use client";

/* eslint-disable perfectionist/sort-imports, import/order */
import Image from "next/image";
import { useEffect, useState } from "react";

import BackIcon from "@/public/ep_back.svg";
import DropdownArrow from "@/public/Vector.svg";

import styles from "./LoginPage.module.css";
/* eslint-enable perfectionist/sort-imports, import/order */

type Member = {
  name: string;
  [key: string]: unknown;
};

// Simple helper type to safely handle Next.js static asset imports
type StaticImageData = { src: string; height: number; width: number; blurDataURL?: string };

export default function LoginPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [_selectedName, setSelectedName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    async function loadMembers() {
      const res = await fetch("http://localhost:3001/api/members");
      const data = (await res.json()) as Member[];
      setMembers(data);
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

  const uniqueMembers = Array.from(new Map(members.map((m) => [m.name, m])).values());

  const filteredMembers = uniqueMembers.filter((m) => {
    const fullName = m.name.toLowerCase().trim();
    const search = searchTerm.toLowerCase().trim();
    return fullName.startsWith(search);
  });

  return (
    <main className={styles.container}>
      <button className={styles.backButton}>
        <Image src={BackIcon as StaticImageData} alt="back" />
      </button>

      <div className={styles.layoutWrapper}>
        <h1 className={styles.title}>Welcome!</h1>

        <p className={styles.subtitle}>Log in and start tracking social points.</p>

        <div
          className={`${styles.dropdownWrapper} ${dropdownOpen ? styles.dropdownWrapperOpen : ""}`}
        >
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`${styles.inputBox} ${dropdownOpen ? styles.inputBoxOpen : ""}`}
          >
            <span className={styles.label}>Name</span>

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
              className={`${styles.dropdownArrow} ${dropdownOpen ? styles.arrowOpen : ""}`}
            />

            <span className={styles.helper}>Enter your name</span>
          </div>
          {dropdownOpen && (
            <div className={`${styles.dropdownList} ${styles.dropdownOpen}`}>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((m) => (
                  <button
                    key={m.name}
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

        <button className={styles.continueButton}>CONTINUE</button>
      </div>
    </main>
  );
}
