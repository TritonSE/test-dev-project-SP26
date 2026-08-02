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

if (!process.env.PUBLIC_BACKEND_URI) throw InternalError.NO_PUBLIC_BACKEND_URI;
const public_backend_uri = process.env.PUBLIC_BACKEND_URI;

export { database_url, frontend_origin, port, public_backend_uri };
