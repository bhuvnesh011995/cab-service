const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    wallet: { type: Schema.Types.ObjectId },
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
      country: { type: Schema.Types.ObjectId },
      state: { type: Schema.Types.ObjectId },
      city: { type: Schema.Types.ObjectId },
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
      file: String,
      verified: {
        type: Boolean,
        required: true,
        default: false,
      },
      verifiedBy: { type: Schema.Types.ObjectId },
    },
    aadhar: {
      number: Number,
      file: String,
      verified: {
        type: Boolean,
        required: true,
        default: false,
      },
      verifiedBy: { type: Schema.Types.ObjectId },
    },
    pan: {
      number: String,
      file: String,
      verified: {
        type: Boolean,
        required: true,
        default: false,
      },
      verifiedBy: { type: Schema.Types.ObjectId },
    },

    verified: {
      type: Boolean,
      default: false,
    },

    verifiedBy: { type: Schema.Types.ObjectId },

    status: {
      type: String,
      required: true,
      default: "INACTIVE",
      enum: ["ACTIVE", "INACTIVE"],
    },

    createdBy: { type: Schema.Types.ObjectId },

    updatedBy: { type: Schema.Types.ObjectId },

    vehicle: [{ type: Schema.Types.ObjectId }],

    driverHistory: [{ type: Schema.Types.ObjectId }],
  },
  {
    timestamps: true,
    collection: "Driver",
  }
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
