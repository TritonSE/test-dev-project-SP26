import { Schema, model } from "mongoose";

import type { InferSchemaType } from "mongoose";

const memberSchema = new Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
  role: { type: String, required: true },
  isPVP: { type: Boolean, required: true },
});

type Member = InferSchemaType<typeof memberSchema>;

export default model<Member>("Member", memberSchema);
