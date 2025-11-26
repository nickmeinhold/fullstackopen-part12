const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

let connectionPromise = null;

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (!connectionPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not set");
    }
    console.log("Connecting to MongoDB...");
    connectionPromise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      })
      .then((conn) => {
        console.log("MongoDB connected");
        return conn;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        // Reset promise so next request can retry
        connectionPromise = null;
        throw err;
      });
  }
  return connectionPromise;
}

module.exports = { connectToDatabase, mongoose };
