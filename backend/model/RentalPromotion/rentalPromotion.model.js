const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    country: { type: Schema.Types.ObjectId, ref: "Country" },
    state: { type: Schema.Types.ObjectId, ref: "State" },
    city: { type: Schema.Types.ObjectId, ref: "City" },
    vehicleType: { type: Schema.Types.ObjectId, ref: "VehicleType" },
    package: { type: Schema.Types.ObjectId, ref: "RentalPackage" },
    discountType: { type: String },
    discountValue: { type: String },
    promoCode: { type: Number },
    validFrom: { type: Date },
    validTo: { type: Date },
    status: {
      type: String,
      default: "INACTIVE",
      enum: ["ACTIVE", "INACTIVE"],
    },
    multipleUser: {
      type: String,
      enum: ["true", "false"],
    },
    forUser: {
      type: String,
      enum: ["Admin", "Rider"],
    },
    selectUser: {
      type: Schema.Types.ObjectId,
      ref: function () {
        return this.forUser === "Admin" ? "Admin" : "Rider";
      },
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "rentalPromotion",
  }
);

module.exports = model("rentalPromotion", schema);
