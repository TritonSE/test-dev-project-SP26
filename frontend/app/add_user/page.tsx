"use client";

import React, { useState } from "react";

import styles from "./new_user.module.css";

export default function NewUserPage() {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");
  const [isPVP, setIsPVP] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMember = { name, team, role, isPVP };

    try {
      const response = await fetch("api/members", {
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
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the New User Page!</h1>
      <p className={styles.description}>Note that only admin should be able to add new users.</p>
      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
        className={styles.form}
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
        <button className={styles.submitButton}>Add user</button>
      </form>
    </div>
  );
}
