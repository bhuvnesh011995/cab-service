const { Schema, model, trusted } = require("mongoose");

const schema = new Schema(
  {
    profilePhoto: {
      data: Buffer,
      contentType: String,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
      require:true
    },
    DOB: {
      type: Date,
    },

    status:{
        type:String,
        require:true,
        default:"INACTIVE",
        enum:["ACTIVE","INACTIVE"]
    },

    wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },

    address: {
        place:{ type: String, require: true },

        country: { type: Schema.Types.ObjectId, ref: "Country", require:true },

        state: { type: Schema.Types.ObjectId, ref: "State", require:true },
    
        city: { type: Schema.Types.ObjectId, ref: "City", require: true },

        pincode: { type: Number, require: true },
    },

    gender: { type: String, require: true, enum: ["MALE", "FEMALE"] },

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
