const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,   // 1: MALE, 2: FEMALE, 3: OTHER
      required: true
    },
    age: { 
      type: Number, 
      required: true 
    },
    interests: [{ 
      type: String
    }],
    address: { 
      type: String
    },
    country: { 
      type: String
    },
    state: { 
      type: String 
    },
    zipcode: { 
      type: String 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
