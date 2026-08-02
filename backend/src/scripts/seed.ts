import mongoose from "mongoose";

import { database_url } from "../config";
import members from "../data/members";
import Member from "../models/memberModel";

async function seed() {
  await mongoose.connect(database_url);
  console.info("Connected to MongoDB");

  await Member.deleteMany({});
  const inserted = await Member.insertMany(members);
  console.info(`Seeded ${inserted.length} members`);

  await mongoose.disconnect();
  console.info("Done");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
