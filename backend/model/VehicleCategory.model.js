const { Schema, model } = require("mongoose");

let schema = new Schema(
  {
    vehicleCategory: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    collection: "vehicleCategory",
    timestamps: true,
  }
);

module.exports = model("vehicleCategory", schema);
