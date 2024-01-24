const { Schema, model } = require("mongoose");

let schema = new Schema(
  {
    package: {
      type: Schema.Types.ObjectId,
      ref: "RentalPackage",
    },

    country: { type: Schema.Types.ObjectId, ref: "Country" },
    state: { type: Schema.Types.ObjectId, ref: "State" },
    city: { type: Schema.Types.ObjectId, ref: "City" },

    vehicleType: { type: Schema.Types.ObjectId, ref: "VehicleType" },
    packageFare: { type: String },
    minCharge: {
      type: String,
    },
    perMinCharge: {
      type: String,
    },
    cancelCharge: {
      type: String,
    },
    bookingFee: {
      type: String,
    },
    adminCommissionType: {
      type: String,
      required: true,
    },
    adminCommission: {
      type: String,
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
    perKMCharge: [{ type: Schema.Types.ObjectId, ref: "PerKMCharge" }],
  },
  {
    collection: "RentalFareCountry",
  },
);

module.exports = model("RentalFareCountry", schema);
