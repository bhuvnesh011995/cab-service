const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: String,
    forUsers: [{ type: Schema.Types.ObjectId, ref: "Driver" }],
    notification: String,
  },
  { collection: "Drivernotification", timestamps: true }
);

module.exports = model("Drivernotification", schema);
