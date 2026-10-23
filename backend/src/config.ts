import dotenv from "dotenv";

import { InternalError } from "./errors";

// Retrieve .env variables
dotenv.config({ quiet: true });

if (!process.env.PORT) throw InternalError.NO_APP_PORT;
const port = process.env.PORT;

if (!process.env.FRONTEND_ORIGIN) throw InternalError.NO_FRONTEND_ORIGIN;
const frontend_origin = process.env.FRONTEND_ORIGIN;

if (!process.env.MONGODB_URI) throw InternalError.NO_MONGODB_URI;
const database_url = process.env.MONGODB_URI;

if (!process.env.AWS_REGION) throw InternalError.NO_AWS_REGION;
const aws_region = process.env.AWS_REGION;

if (!process.env.AWS_ACCESS_KEY_ID) throw InternalError.NO_AWS_ACCESS_KEY_ID;
const aws_access_key_id = process.env.AWS_ACCESS_KEY_ID;

if (!process.env.AWS_SECRET_ACCESS_KEY) throw InternalError.NO_AWS_SECRET_ACCESS_KEY;
const aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY;

if (!process.env.AWS_S3_BUCKET_NAME) throw InternalError.NO_AWS_S3_BUCKET_NAME;
const aws_s3_bucket_name = process.env.AWS_S3_BUCKET_NAME;

if (!process.env.EXPIRATION_TIME) throw InternalError.NO_EXPIRATION_TIME;
const expiration_time = process.env.EXPIRATION_TIME;

export {
  database_url,
  frontend_origin,
  port,
  aws_region,
  aws_access_key_id,
  aws_secret_access_key,
  aws_s3_bucket_name,
  expiration_time,
};
