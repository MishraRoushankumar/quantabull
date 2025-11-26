import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

if (!MONGODB_URI) {
  // Do not throw at import time; let callers get a clearer error when attempting to connect
  console.warn(
    "MONGODB_URI is not set. Database connections will fail until it is provided."
  );
}

let cached = global.mongooseCache;
if (!cached) {
  global.mongooseCache = { conn: null, promise: null };
  cached = global.mongooseCache;
}

export const connectToDatabase = async () => {
  if (!MONGODB_URI)
    throw new Error("MONGODB_URI must be set in environment variables");

  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    // store the mongoose connect() promise in the cache so concurrent calls share it
    cached!.promise = mongoose
      .connect(MONGODB_URI, {
        // recommended options
        // useNewUrlParser and useUnifiedTopology are defaults in recent mongoose versions
        bufferCommands: false,
      })
      .then((m) => m);
  }

  try {
    cached!.conn = await cached!.promise;
    console.log(`Connected to MongoDB (${process.env.NODE_ENV || "unknown"})`);
    return cached!.conn;
  } catch (err) {
    cached!.promise = null;
    throw err;
  }
};
