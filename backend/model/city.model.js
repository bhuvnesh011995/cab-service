const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "INACTIVE",
    },
    utcOffset: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: Date.now(),
    },
    territory: { type: Schema.Types.ObjectId, ref: "Territory" },
    country: { type: Schema.Types.ObjectId, ref: "Country" },
    state: { type: Schema.Types.ObjectId, ref: "State" },
    cityService: [
      {
        vehicleType: { type: Schema.Types.ObjectId, ref: "VehicleType" },
        runMode: [{ type: Schema.Types.ObjectId, ref: "runMode" }],
      },
    ],
  },
  {
    collection: "City",
  }
);

module.exports = model("City", schema);
