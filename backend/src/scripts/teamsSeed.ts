import mongoose from "mongoose";

import { database_url } from "../config";
import { teams } from "../data/data";
import Team from "../models/Team";

async function seedTeams() {
  await mongoose.connect(database_url);
  console.info("Connected to database");

  await Team.deleteMany({});
  const insertedTeams = await Team.insertMany(teams);
  console.info(`Seeded ${insertedTeams.length} teams`);

  await mongoose.disconnect();
  console.info("Done");
}

seedTeams().catch((err) => {
  console.info(err);
  process.exit(1);
});
