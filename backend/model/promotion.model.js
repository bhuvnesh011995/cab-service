const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
    },
    country: { type: Schema.Types.ObjectId, ref: "Country" },

    state: { type: Schema.Types.ObjectId, ref: "State" },

    city: { type: Schema.Types.ObjectId, ref: "City" },

    forUsers: [
      {
        type: String,
        enum: ["ADMIN", "DRIVER", "RIDER"],
        required: true,
      },
    ],

    image: { data: Buffer, contentType: String },

    status: {
      type: String,
      default: "INACTIVE",
      enum: ["ACTIVE", "INACTIVE"],
    },
    description: { type: String },
  },
  {
    timestamps: true,
    collection: "Promotion",
  }
);

module.exports = model("Promotion", schema);
