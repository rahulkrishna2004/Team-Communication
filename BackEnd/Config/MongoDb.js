const mongoose = require("mongoose");

// Database connection function
const ConnectionDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/team_communication");
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("Error in DB Connection:", error.message);
    process.exit(1); 
  }
};

module.exports = ConnectionDb;
