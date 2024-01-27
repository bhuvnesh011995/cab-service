const { Schema, model } = require("mongoose");

let schema = new Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    forUsers: [{ value: { type: String }, label: { type: String } }],
    status: {
      type: String,
      required: true,
      default: "INACTIVE",
      enum: ["ACTIVE", "INACTIVE"],
    },
  },
  {
    collection: "EmailTemplate",
    timestamps: true,
  },
);

module.exports = model("EmailTemplate", schema);
