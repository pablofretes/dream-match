import mongoose from 'mongoose';

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;
interface Cached {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}
const cached: Cached = (global as any).mongoose || ((global as any).mongoose = { connection: null, promise: null });
async function connectToMongoDB() {
  if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
  }
  if (cached.connection && cached.connection.connection.readyState === 1) {
    return cached.connection;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts);
  }
  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.connection;
}
export default connectToMongoDB;
