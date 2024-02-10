const { Schema, model } = require("mongoose");

let schema = new Schema(
  {
    name: {
      type: String,
    },
    forUsers: [
      {
        type: String,
        enum: ["ADMIN", "DRIVER", "RIDER"],
      },
    ],
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
    },

    country: { type: Schema.Types.ObjectId, ref: "Country" },
    state: { type: Schema.Types.ObjectId, ref: "State" },
    city: { type: Schema.Types.ObjectId, ref: "City" },

    freeRideToReferrer: Boolean,

    maxFreeRideToReferrer: Number,

    amountToReferrer: Number,

    maxAmountToReferrer: Number,

    freeRideToApplier: Boolean,

    amountToApplier: Number,

    image: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
    collection: "Referral",
  }
);

module.exports = model("Referral", schema);
