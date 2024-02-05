const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE"],
      default: "INACTIVE",
    },

    taxType: String,
  },
  {
    timestamps: true,
    collection: "Tax",
  }
);

module.exports = model("Tax", schema);
