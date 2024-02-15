const mongoose = require("mongoose");
const { Schema, model } = mongoose;
let schema = new Schema(
  {
    totalDistance: {
      type: String,
    },
    totalTime: {
      type: String,
    },
    totalFreeRide: {
      type: String,
    },
    appliedFare: {
      type: String,
    },
    tollFare: {
      type: String,
    },
    taxFare: {
      type: String,
    },
    bookingfee: {
      type: String,
    },
    tripCommission: {
      type: String,
    },
    driverTripCommission: {
      type: String,
    },
    promocodeAmount: {
      type: String,
    },
    driveCommission: {
      type: String,
    },
    adminCommission: {
      type: String,
    },
    adminHand: {
      type: String,
    },
    driverHand: {
      type: String,
    },
    payoutAmount: {
      type: String,
    },
    payoutType: {
      type: String,
    },
    walletAmount: {
      type: String,
    },
    cashMoney: {
      type: String,
    },
  },
  { collection: "driverPayoutManagement" }
);
module.exports = model("driverPayoutManagement", schema);
