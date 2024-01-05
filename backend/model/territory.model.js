const { Schema, model } = require("mongoose");

const tempSchema = new Schema(
  {
    lat: Number,
    lng: Number,
  },
  {
    _id: false,
  }
);

const schema = new Schema(
  {
    area: [tempSchema],
  },
  {
    collection: "Territory",
  }
);

module.exports = model("Territory", schema);
