import mongoose from "mongoose";

import { database_url } from "../config";
import { submissions } from "../data/data";
import Member from "../models/Member";
import Submission from "../models/Submission";
import Team from "../models/Team";

async function seedSubmissions() {
  await mongoose.connect(database_url);
  console.info("Connected to MongoDB");

  const submissionsToInsert = await Promise.all(
    submissions.map(async (submission) => {
      const allocationsToInsert = await Promise.all(
        submission.pointAllocation.map(async (allocation) => {
          const team = await Team.findOne({ teamName: allocation.team });

          if (!team) {
            throw new Error(`Team not found for submission ${submission.eventName}`);
          }
          return {
            ...allocation,
            team: team?._id.toString(),
          };
        }),
      );
      const member = await Member.findOne({ name: submission.member });

      if (!member) {
        throw new Error(`Member not found for submission ${submission.eventName}`);
      }

      return {
        ...submission,
        pointAllocation: allocationsToInsert,
        member: member?._id.toString(),
      };
    }),
  );

  await Submission.deleteMany({});
  const inserted = await Submission.insertMany(submissionsToInsert);
  console.info(`Seeded ${inserted.length} submissions`);

  await mongoose.disconnect();
  console.info("Done");
}

seedSubmissions().catch((err) => {
  console.error(err);
  process.exit(1);
});
