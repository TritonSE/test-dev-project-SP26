import { CustomError } from "./errors";

const NO_APP_PORT = "Could not find app port env variable";
const NO_FRONTEND_ORIGIN = "Could not find frontend origin env variable";
const NO_MONGODB_URI = "Could not find MONGODB_URI env variable";
const NO_PUBLIC_BACKEND_URI = "Could not find PUBLIC_BACKEND_URI env variable";

export class InternalError extends CustomError {
  static NO_APP_PORT = new InternalError(0, 500, NO_APP_PORT);
  static NO_FRONTEND_ORIGIN = new InternalError(0, 500, NO_FRONTEND_ORIGIN);
  static NO_MONGODB_URI = new InternalError(0, 500, NO_MONGODB_URI);
  static NO_PUBLIC_BACKEND_URI = new InternalError(0, 500, NO_PUBLIC_BACKEND_URI);
}
