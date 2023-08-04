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
      "Petrol",
      "Diesel",
      "Electric Vehicles",
      "CNG",
      "Ethanol or Methanol",
      "Gasoline",
      "Bio-Diesel",
      "LPG",
    ],
  },
  seatingCapacityName:{
      type:String,
      require:true
  },
  seatingCapacity:{
      type:Number,
      require:true,
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
    }
  },
  insurance:{
    expiryDate:Date,
    photo:{
        data:Buffer,
        contentType:String
    },
    verified:{
      type:Boolean,
      require:true,
      default: false
    },
    varifiedBy:{type:Schema.Types.ObjectId,ref:"Admin"}
  },
  permit:{
    expiryDate:Date,
    photo:{
        data:Buffer,
        contentType:String
    },
    verified:{
      type:Boolean,
      require:true,
      default: false
    },
    varifiedBy:{type:Schema.Types.ObjectId,ref:"Admin"}
  },
  pollutionCertificate:{
    expiryDate:Date,
    photo:{
        data:Buffer,
        contentType:String
    },
    verified:{
      type:Boolean,
      require:true,
      default: false
    },
    varifiedBy:{type:Schema.Types.ObjectId,ref:"Admin"}
  },
  plateNo:String,
  status:{
    type:String,
    require:true,
    default:"INACTIVE",
    enum:["ACTIVE","INACTIVE"]
  },
  verified:{
    type:Boolean,
    default:false
  },
  varifiedBy:{type:Schema.Types.ObjectId,ref:"Admin"}
},{
    collection:"Vehicle",
    timestamps:true
});


module.exports = model("Vehicle",schema)