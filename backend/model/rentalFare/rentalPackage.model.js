const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    maxDuration: {
      type: String,
      required: true,
    },
    maxDistance: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "INACTIVE",
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: Date.now(),
    },
  },
  {
    collection: "RentalPackage",
  },
);

module.exports = model("RentalPackage", schema);
