import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("ERROR: MONGODB_URI environment variable is not set.");
  console.error(
    'Set it using PowerShell: $env:MONGODB_URI = "your_connection_string"'
  );
  process.exit(1);
}

console.log("Testing MongoDB connection to:", uri);

mongoose
  .connect(uri, { bufferCommands: false })
  .then(() => {
    console.log("Successfully connected to MongoDB");
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Connection closed. Test complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Connection failed:");
    console.error(err);
    process.exit(1);
  });
