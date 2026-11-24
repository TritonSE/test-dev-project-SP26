import { Schema, model } from "mongoose";
import type { InferSchemaType } from "mongoose";

const rankingsSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    rankings: {
      type: [String],
      required: true,
    },
    source: {
      type: String,
      enum: ["submission", "pointsAdjustment"],
      required: true,
    },
    submission: {
      type: Schema.Types.ObjectId,
      ref: "Submission",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

type Rankings = InferSchemaType<typeof rankingsSchema>;

export default model<Rankings>("Rankings", rankingsSchema);
