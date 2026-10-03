import { Schema, model } from "mongoose";

import type { InferSchemaType } from "mongoose";

const memberSchema = new Schema({
  name: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  role: { type: String, required: true },
  isPVP: { type: Boolean, required: true },
  photoUrl: { type: String, required: false },
});

type Member = InferSchemaType<typeof memberSchema>;

export default model<Member>("Member", memberSchema);
