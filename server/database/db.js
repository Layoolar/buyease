const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config({path: "./.env"})


async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "buyease_test_db"
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}
module.exports = {
  connectToDatabase,
};
