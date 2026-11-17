import { randomUUID } from "node:crypto";

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
  aws_access_key_id,
  aws_region,
  aws_s3_bucket_name,
  aws_secret_access_key,
  expiration_time,
} from "../config";

import type { Buffer } from "node:buffer";

const s3Client = new S3Client({
  region: aws_region,
  credentials: {
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
  },
});

export const uploadFileToS3 = async (
  fileBuffer: Buffer,
  originalFilename: string,
  mimeType: string,
): Promise<string> => {
  const extension = /\.[a-z0-9]{1,10}$/i.exec(originalFilename)?.[0] ?? "";
  const uniqueFilename = `uploads/${randomUUID()}${extension}`;

  const command = new PutObjectCommand({
    Bucket: aws_s3_bucket_name,
    Key: uniqueFilename,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  await s3Client.send(command);

  return uniqueFilename;
};

export const deleteFileFromS3 = async (fileKey: string): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: aws_s3_bucket_name,
    Key: fileKey,
  });

  await s3Client.send(command);
};

export const getPresignedImageUrl = async (fileKey: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: aws_s3_bucket_name,
    Key: fileKey,
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: expiration_time ? Number.parseInt(expiration_time) : 3600,
  });

  return signedUrl;
};
