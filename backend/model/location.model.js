const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: String,
    amount: Number,
    lat: String,
    status: String,
    lng: String,
  },
  {
    timestamps: true,
    collection: "Location",
  },
);

module.exports = model("Location", schema);
