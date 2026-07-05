import mongoose from "mongoose";

type ConfigType = {
  key: string;
  value: string;
};

const configSchema = new mongoose.Schema<ConfigType>({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

export const Config = mongoose.model<ConfigType>("Config", configSchema, "config");
