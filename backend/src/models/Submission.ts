import { Schema, model } from "mongoose";
import type { InferSchemaType } from "mongoose";

const submissionSchema = new Schema(
  {
    photoKeys: {
      type: [String],
      validate: [(val: string[]) => val.length > 0, "At least one photo key is required."],
    },
    eventName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    location: {
      type: String,
      required: true,
    },
    pointAllocation: [
      {
        team: {
          type: Schema.Types.ObjectId,
          ref: "Team",
          required: true,
        },
        points: {
          type: Number,
          required: true,
          default: 0,
        },
        _id: false,
      },
    ],
    tags: [
      {
        photoIndex: {
          type: Number,
          required: true,
          min: 0,
        },
        member: {
          type: Schema.Types.ObjectId,
          ref: "Member",
          required: true,
        },
        x: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        y: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        _id: false,
      },
    ],
    pvpHandling: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
      required: true,
    },
    awardedTeam: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required(this: { pvpHandling: string }): boolean {
        return this.pvpHandling === "yes";
      },
    },
    pvpPoints: {
      type: Number,
      min: 0,
      required(this: { pvpHandling: string }): boolean {
        return this.pvpHandling === "yes";
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: true,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
  },
  { timestamps: true },
);

export type Submission = InferSchemaType<typeof submissionSchema>;

export default model<Submission>("Submission", submissionSchema);
