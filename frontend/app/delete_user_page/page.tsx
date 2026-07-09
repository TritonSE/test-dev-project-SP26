"use client";

import { useEffect, useState } from "react";

import styles from "./delete_user_page.module.css";

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
        const response = await fetch("http://localhost:3001/api/members");
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
      const response = await fetch(`http://localhost:3001/api/members/${member._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete member");
      }
      setMembers((prevMembers) => prevMembers.filter((m) => m.name !== member.name));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const uniqueMembers = Array.from(new Map(members.map((m) => [m.name, m])).values());

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Delete User Page</h1>
      <p className="text-lg text-gray-600">Note that only admin should be able to delete users.</p>
      <table className={styles.table}>
        <colgroup>
          <col style={{ width: "36%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "14%" }} />
          <col style={{ width: "14%" }} />
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
          {uniqueMembers.map((member) => (
            <tr key={member.name}>
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
