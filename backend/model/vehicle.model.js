const { Schema, model } = require("mongoose");

const schema = new Schema({
  driver:{type:Schema.Types.ObjectId,ref:"Driver"},
  photo:{
    data:Buffer,
    contentType:String
  },
  vehicleType: { type: Schema.Types.ObjectId, ref: "VehicleType" },

  fuelType: {
    type: String,
    enum: [
      "petrol",
      "diesel",
      "electric vehicles",
      "cng",
      "ethanol or methanol",
      "gasoline",
      "bio-diesel",
      "lpg",
    ],
  },
  seatingCapacityName:{
    type:String,
    required:true
  },
  seatingCapacity:{
    type:Number,
    required:true,
  },
  make:{type:Schema.Types.ObjectId,ref:"Make"},
  model:String,
  year:Number,
  color:String,

  registration:{
    number:String,
    expiryDate:Date,
    photo:{
      data:Buffer,
      contentType:String
    },
    verified:{
      type:Boolean,
      required:true,
      default: false
    },
    verifiedBy:{type:Schema.Types.ObjectId,ref:"Admin"}
  },
  insurance:{
    expiryDate:Date,
    photo:{
      data:Buffer,
      contentType:String
    },
    verified:{
      type:Boolean,
      required:true,
      default: false
    },
    verifiedBy:{type:Schema.Types.ObjectId,ref:"Admin"}
  },
  permit:{
    expiryDate:Date,
    photo:{
      data:Buffer,
      contentType:String
    },
    verified:{
      type:Boolean,
      required:true,
      default: false
    },
    verifiedBy:{type:Schema.Types.ObjectId,ref:"Admin"}
  },
  pollutionCertificate:{
    expiryDate:Date,
    photo:{
      data:Buffer,
      contentType:String
    },
    verified:{
      type:Boolean,
      required:true,
      default: false
    },
    verifiedBy:{type:Schema.Types.ObjectId,ref:"Admin"}
  },
  plateNo:String,
  status:{
    type:String,
    required:true,
    default:"INACTIVE",
    enum:["ACTIVE","INACTIVE"]
  },
  verified:{
    type:Boolean,
    default:false
  },
  verifiedBy:{type:Schema.Types.ObjectId,ref:"Admin"}
},{
    collection:"Vehicle",
    timestamps:true
});


module.exports = model("Vehicle",schema)