import { Schema, model } from "mongoose";

import type { InferSchemaType } from "mongoose";

const teamSchema = new Schema({
  teamName: { type: String, required: true },
  points: { type: Number, required: true, default: 0 },
});

type Team = InferSchemaType<typeof teamSchema>;

export default model<Team>("Team", teamSchema);
