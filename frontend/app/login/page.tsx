"use client";

import { useEffect, useState } from "react";

// =============================================================================
// SCREEN: Authentication  (/login)
// =============================================================================
// PURPOSE: Gate access to submission form behind a club invite code.
//
// WHAT TO BUILD HERE:
//   - Input field for the club-wide invite code
//   - Dropdown to select your name from the member list
//   - Dropdown to select your team
//   - Submit button that validates the code via POST /api/auth/login
//   - On success: save auth token (localStorage or cookie) + redirect to /submit
//   - On failure: show an error message
//
// DATA NEEDED FROM BACKEND:
//   POST /api/auth/login  →  body: { inviteCode, memberId, teamId }
//                         ←  { token } or error
//   GET  /api/members     →  [{ id, name, teamId }]
//   GET  /api/teams       →  [{ id, name }]
//
// NOTES:
//   - Mobile view only (no need to optimize for desktop)
//   - The invite code is club-wide (one code for all members)
// =============================================================================

export default function LoginPage() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [usedNames, setUsedNames] = useState([]);

  useEffect(() => {
    async function loadMembers() {
      const res = await fetch("http://localhost:3001/api/members");
      const data = await res.json();
      setMembers(data);
    }
    loadMembers();
  }, []);

  const filteredMembers = members
    .filter((m) => !usedNames.includes(m.name))
    .filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#0C2B35",
        color: "white",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontWeight: 750,
          fontSize: "44px",
          width: "207px",
          height: "52px",
          color: "#DEBB01",
          marginTop: "362px",
          marginBottom: "8px",
        }}
      >
        Welcome!
      </h1>

      <p
        style={{
          fontWeight: 400,
          fontSize: "15px",
          width: "365px",
          height: "18px",
          color: "white",
          marginBottom: "32px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Log in and start tracking social points.
      </p>

      {/* TODO: Add invite code input */}
      {/* TODO: Add member name dropdown (fetched from API) */}
      <div style={{ marginBottom: "24px", position: "relative" }}>
        {/* Input box */}
        <div
          onClick={() => setDropdownOpen(true)}
          style={{
            height: "129px",
            width: "346px",
            backgroundColor: "white",
            color: "black",
            padding: "14px 16px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {/* Label */}
          <span style={{ fontSize: "14px", color: "Black" }}>Name</span>

          {/* Input */}
          <input
            type="text"
            placeholder="John Doe"
            value={searchTerm || selectedName}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setDropdownOpen(true);
            }}
            style={{
              width: "316px",
              height: "40px",
              border: "none",
              outline: "none",
              background: "#F5F5F5",
              fontSize: "16px",
              color: "#6C6C6C",
            }}
          />

          {/* Helper text */}
          <span style={{ fontSize: "12px", color: "#6C6C6C" }}>Enter your name</span>
        </div>

        {/* Dropdown list */}
        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "56px",
              left: 0,
              right: 0,
              backgroundColor: "white",
              color: "black",
              borderRadius: "8px",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 10,
            }}
          >
            {filteredMembers.map((m) => (
              <button
                key={m.name}
                onClick={() => {
                  setSelectedName(m.name);
                  setSearchTerm(m.name);
                  setUsedNames((prev) => (prev.includes(m.name) ? prev : [...prev, m.name]));
                  setDropdownOpen(false);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  border: "none",
                  background: "white",
                  fontSize: "16px",
                }}
              >
                {m.name}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* TODO: Add team dropdown (fetched from API) */}
      {/* TODO: Add submit button + auth logic */}
      <button
        style={{
          marginTop: "auto",
          marginBottom: "200px",
          width: "345px",
          height: "52px",
          borderRadius: "10px",
          border: "none",
          fontWeight: 650,
          fontSize: "20px",
          backgroundColor: "#DEBB01", // solid yellow
          color: "black", // black text
        }}
      >
        CONTINUE
      </button>
    </main>
  );
}
