"use client";

import React, { useState } from "react";

import styles from "./new_user_page.module.css";

export default function NewUserPage() {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");
  const [isPVP, setIsPVP] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMember = { name, team, role, isPVP };

    try {
      const response = await fetch("http://localhost:3001/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });

      if (!response.ok) {
        throw new Error("Failed to add member");
      }

      setName("");
      setTeam("");
      setRole("");
      setIsPVP(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to the New User Page!</h1>
      <p className="text-lg text-gray-600">Note that only admin should be able to add new users.</p>
      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
        className="flex flex-col items-center gap-2"
      >
        <span>Name</span>
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setName(value);
          }}
          className={styles.textBox}
        />
        <span>Team</span>
        <input
          type="text"
          placeholder="Home Start"
          value={team}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setTeam(value);
          }}
          className={styles.textBox}
        />
        <span>Role</span>
        <input
          type="text"
          placeholder="Designer"
          value={role}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setRole(value);
          }}
          className={styles.textBox}
        />
        <span>Is PVP</span>
        <div onClick={() => setIsPVP(!isPVP)} className={styles.textBox}>
          {String(isPVP)}
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Add user
        </button>
      </form>
    </div>
  );
}
