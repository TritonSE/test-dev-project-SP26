"use client";

import { useEffect, useState } from "react";

import styles from "./delete_user.module.css";

type Member = {
  _id: string;
  name: string;
  team: string;
  role: string;
  isPVP: boolean;
};

export default function DeleteUserPage() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchAllMembers() {
      try {
        const response = await fetch("api/members");
        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }
        const data = (await response.json()) as Member[];
        setMembers(data);
        console.info("Fetched members:", data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }

    void fetchAllMembers();
  }, []);

  const handleDeleteMember = async (member: Member) => {
    try {
      const response = await fetch(`api/members/${member._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete member");
      }
      setMembers((prevMembers) => prevMembers.filter((m) => m._id !== member._id));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Delete User Page</h1>
      <p className={styles.description}>Note that only admin should be able to delete users.</p>
      <table className={styles.table}>
        <colgroup>
          <col className={styles.colName} />
          <col className={styles.colTeam} />
          <col className={styles.colRole} />
          <col className={styles.colPvp} />
          <col className={styles.colAction} />
        </colgroup>
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Role</th>
            <th>Is PVP</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.team}</td>
              <td>{member.role}</td>
              <td>{member.isPVP ? "Yes" : "No"}</td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => {
                    void handleDeleteMember(member);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
