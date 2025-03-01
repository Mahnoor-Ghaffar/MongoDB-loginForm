const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
    //   "mongodb+srv://mahnoorghaffar9:Skpmqu2mBEVNV5jr@cluster0.gaajq.mongodb.net/mydatabase?retryWrites=true&w=majority",
    process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.log("❌ Database connection failed:", error.message);
  }
};

connectDB();

// ✅ Corrected Schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// ✅ Corrected Model
const collection = mongoose.model("user", LoginSchema);

module.exports = collection;
