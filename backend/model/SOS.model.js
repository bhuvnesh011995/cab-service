const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    bookingId: { type: "string", ref: "Booking" },

    userType: {
      type: String,
      required: true,
      enum: ["Driver", "Rider"],
    },

    userId: { type: "string", refPath: "userType" },
    lat: { type: "string" },
    lng: { type: "string" },
    description: String,
  },
  {
    collection: "SOS",
    timestamps: true,
  },
);

module.exports = model("SOS", schema);
