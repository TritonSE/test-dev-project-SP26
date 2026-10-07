import type { Buffer } from "node:buffer";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
  aws_access_key_id,
  aws_region,
  aws_s3_bucket_name,
  aws_secret_access_key,
  expiration_time,
} from "../config";

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
  const uniqueFilename = `uploads/${Date.now()}-${originalFilename}`;

  const command = new PutObjectCommand({
    Bucket: aws_s3_bucket_name,
    Key: uniqueFilename,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  await s3Client.send(command);

  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFilename}`;
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
