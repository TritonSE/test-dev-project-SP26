import mongoose from "mongoose";

import { database_url } from "../config";
import { rankings } from "../data/data";
import Rankings from "../models/Rankings";

async function seedRankings() {
  await mongoose.connect(database_url);
  console.info("Connected to MongoDB");

  await Rankings.deleteMany({});
  const insertedRankings = await Rankings.insertMany(rankings);
  console.info(`Seeded ${insertedRankings.length} rankings`);

  await mongoose.disconnect();
  console.info("Done");
}

seedRankings().catch((err) => {
  console.error(err);
  process.exit(1);
});
