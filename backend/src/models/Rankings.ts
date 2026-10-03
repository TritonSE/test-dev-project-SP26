import { Schema, model } from "mongoose";

import type { InferSchemaType } from "mongoose";

const rankingSchema = new Schema(
  {
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

type Ranking = InferSchemaType<typeof rankingSchema>;

export default model<Ranking>("Ranking", rankingSchema);
