import { Schema, model } from "mongoose";

import type { InferSchemaType } from "mongoose";

const teamSchema = new Schema({
  teamName: { type: String, required: true },
  points: { type: Number, required: true, default: 0 },
  avatarKey: { type: String, required: false, default: null },
  isPVP: { type: Boolean, required: true, default: false },
});

teamSchema.index(
  { isPVP: 1 },
  {
    unique: true,
    partialFilterExpression: { isPVP: true },
  },
);

type Team = InferSchemaType<typeof teamSchema>;

export default model<Team>("Team", teamSchema);
