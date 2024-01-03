const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
    driverFile: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    DOB: {
      type: Date,
    },
    address: {
      country: { type: Schema.Types.ObjectId, ref: "Country" },
      state: { type: Schema.Types.ObjectId, ref: "State" },
      city: { type: Schema.Types.ObjectId, ref: "City" },
      place: String,
      pincode: Number,
    },
    referralCode: {
      type: String,
      unique: true,
    },
    license: {
      number: String,
      expiryDate: Date,
      photo: String,
      verified: {
        type: Boolean,
        required: true,
        default: false,
      },
      verifiedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    },
    aadhar: {
      number: Number,
      photo: String,
      verified: {
        type: Boolean,
        required: true,
        default: false,
      },
      verifiedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    },
    pan: {
      number: String,
      photo: String,
      verified: {
        type: Boolean,
        required: true,
        default: false,
      },
      verifiedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    },

    verified: {
      type: Boolean,
      default: false,
    },

    verifiedBy: { type: Schema.Types.ObjectId, ref: "Admin" },

    status: {
      type: String,
      required: true,
      default: "INACTIVE",
      enum: ["ACTIVE", "INACTIVE"],
    },

    createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },

    updatedBy: { type: Schema.Types.ObjectId, ref: "Admin" },

    vehicle: [{ type: Schema.Types.ObjectId, ref: "Vehicle" }],

    driverHistory: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  },
  {
    timestamps: true,
    collection: "Driver",
  },
);

function generateReferralCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}

schema.pre("save", async function (next) {
  if (this.isNew && !this.referralCode) {
    let isUnique = false;
    while (!isUnique) {
      const referralCode = generateReferralCode();
      const existingUser = await this.constructor.findOne({
        referralCode: referralCode,
      });
      if (!existingUser) {
        this.referralCode = referralCode;
        isUnique = true;
      }
    }
  }
  next();
});

module.exports = model("Driver", schema);
