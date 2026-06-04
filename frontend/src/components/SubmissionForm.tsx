"use client";

import { useEffect, useState } from "react";

import PointAllocation from "./PointAllocation";
import TeamHosting from "./TeamHosting";

type Team = {
  id: string;
  name: string;
};

export default function SubmissionForm() {
  const [teams, setTeams] = useState<Team[]>([
    { id: "dbc", name: "DBC" },
    { id: "f3", name: "F3" },
    { id: "homestart", name: "Homestart" },
    { id: "test", name: "TEST" },
    { id: "pvp", name: "PVP" },
  ]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/teams");
        if (response.ok) {
          const data = (await response.json()) as Team[];
          setTeams(data);
        }
      } catch (err) {
        console.error("Failed to fetch teams", err);
      }
    };

    void fetchTeams();
  }, []);

  return (
    <div>
      <TeamHosting teams={teams} />
      <PointAllocation teams={teams} />
    </div>
  );
}
