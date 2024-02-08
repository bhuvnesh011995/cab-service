const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: String,
    forUsers: [{ type: Schema.Types.ObjectId, ref: "Rider" }],
    notification: String,
  },
  { collection: "Ridernotification", timestamps: true }
);

module.exports = model("Ridernotification", schema);
