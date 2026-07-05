import mongoose from "mongoose";

type MemberType = {
  name: string;
  team: string;
  role: string;
  isPVP: boolean;
};

const memberSchema = new mongoose.Schema<MemberType>({
  name: { type: String, required: true },
  team: { type: String, required: true },
  role: { type: String, required: true },
  isPVP: { type: Boolean, default: false },
});

export const Member = mongoose.model<MemberType>("Member", memberSchema);
