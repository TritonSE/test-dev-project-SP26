import mongoose from "mongoose";

import { database_url } from "../config";
import { members } from "../data/data";
import Member from "../models/Member";
import Team from "../models/Team";

async function seedMembers() {
  await mongoose.connect(database_url);
  console.info("Connected to MongoDB");

  await Member.deleteMany({});
  const membersToInsert = await Promise.all(
    members.map(async (member) => {
      const team = await Team.findOne({ teamName: member.team });

      if (!team) {
        throw new Error(`Team not found for member: ${member.name}`);
      }
      return {
        ...member,
        team: team?._id.toString(),
      };
    }),
  );

  const inserted = await Member.insertMany(membersToInsert);
  console.info(`Seeded ${inserted.length} members`);

  await mongoose.disconnect();
  console.info("Done");
}

seedMembers().catch((err) => {
  console.error(err);
  process.exit(1);
});
