const { Schema, model } = require("mongoose");

let schema = new Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    forUsers: [{ type: String, enum: ["ADMIN", "DRIVER", "RIDER"] }],
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
  }
);
schema.index({
  title: "text",
  forUsers: "text",
  status: "text",
});

module.exports = model("EmailTemplate", schema);
