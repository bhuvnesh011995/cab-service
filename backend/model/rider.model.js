const { Schema, model, trusted } = require("mongoose");

const schema = new Schema(
  {
    profilePhoto: {
      data: Buffer,
      contentType: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
      required:true
    },
    DOB: {
      type: Date,
    },

    status:{
        type:String,
        required:true,
        default:"INACTIVE",
        enum:["ACTIVE","INACTIVE"]
    },

    wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },

    address: {
        place:{ type: String, required: true },

        country: { type: Schema.Types.ObjectId, ref: "Country", required:true },

        state: { type: Schema.Types.ObjectId, ref: "State", required:true },
    
        city: { type: Schema.Types.ObjectId, ref: "City", required: true },

        pincode: { type: Number, required: true },
    },

    gender: { type: String, required: true, enum: ["MALE", "FEMALE"] },

    loginDevice: String,

    lastLoginActivity: String,

    updatePasswordDate: Date,

    remark: String,

    riderHistory: [{ type: Schema.Types.ObjectId, ref: "Booking" }],

    verified: {
      type: Boolean,
      default: false,
    },
    varifiedBy:{type:Schema.Types.ObjectId,ref:"Admin"}
  },
  {
    timestamps: true,
    collection: "Rider",
  }
);

schema.index({
  firstName: "text",
  lastName: "text",
  email: "text",
  phone: "text",
});

module.exports = model("Rider", schema);
