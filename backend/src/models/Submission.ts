import { Schema, model } from "mongoose";

import type { InferSchemaType } from "mongoose";

const submissionSchema = new Schema(
  {
    photoUrls: [{ type: String, required: true }],
    eventName: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    location: { type: String, required: true },
    pointAllocation: [
      {
        team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
        points: { type: Number, required: true, default: 0 },
        _id: false,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: true,
    },
    member: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  },
  { timestamps: true },
);

type Submission = InferSchemaType<typeof submissionSchema>;

export default model<Submission>("Submission", submissionSchema);
