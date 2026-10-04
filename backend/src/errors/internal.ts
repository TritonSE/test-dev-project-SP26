import { CustomError } from "./errors";

const NO_APP_PORT = "Could not find app port env variable";
const NO_FRONTEND_ORIGIN = "Could not find frontend origin env variable";
const NO_MONGODB_URI = "Could not find MONGODB_URI env variable";
const NO_AWS_REGION = "Could not find AWS_REGION env variable";
const NO_AWS_ACCESS_KEY_ID = "Could not find AWS_ACCESS_KEY_ID env variable";
const NO_AWS_SECRET_ACCESS_KEY = "Could not find AWS_SECRET_ACCESS_KEY env variable";
const NO_AWS_S3_BUCKET_NAME = "Could not find AWS_S3_BUCKET_NAME env variable";
const NO_EXPIRATION_TIME = "Could not find EXPIRATION_TIME env variable";

export class InternalError extends CustomError {
  static NO_APP_PORT = new InternalError(0, 500, NO_APP_PORT);
  static NO_FRONTEND_ORIGIN = new InternalError(0, 500, NO_FRONTEND_ORIGIN);
  static NO_MONGODB_URI = new InternalError(0, 500, NO_MONGODB_URI);
  static NO_AWS_REGION = new InternalError(0, 500, NO_AWS_REGION);
  static NO_AWS_ACCESS_KEY_ID = new InternalError(0, 500, NO_AWS_ACCESS_KEY_ID);
  static NO_AWS_SECRET_ACCESS_KEY = new InternalError(0, 500, NO_AWS_SECRET_ACCESS_KEY);
  static NO_AWS_S3_BUCKET_NAME = new InternalError(0, 500, NO_AWS_S3_BUCKET_NAME);
  static NO_EXPIRATION_TIME = new InternalError(0, 500, NO_EXPIRATION_TIME);
}
