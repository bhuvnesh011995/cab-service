const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const adminSchema = new Schema(
  {
    name: {
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
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "INACTIVE",
    },
    role: {
      type: String,
      enum: ["superadmin", "admin"],
      default: "admin",
    },

    country: {
      type: String,
      // unique: true,
    },
    state: {
      type: String,
      // unique: true,
    },
    city: {
      type: String,
    },
    permissions: {
      type: [String],
      required: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: Date.now(),
    },

    service: [{ type: mongoose.Types.ObjectId, ref: "Services" }],
  },
  {
    collection: "Admin",
  }
);

adminSchema.index({
  name: "text",
  username: "text",
});

module.exports = model("Admin", adminSchema);
