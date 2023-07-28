const {Schema,model} = require("mongoose");

let schema = new Schema({
    package:[{
        packageId:{type:Schema.Types.ObjectId,ref:"RentalPackage"},
        packageFare:{
        type:Schema.Types.Decimal128,
        require:true,
        },
    }],
    country:{type:Schema.Types.ObjectId,ref:"Country"},

    state:{type:Schema.Types.ObjectId,ref:"State"},
    city:[{type:Schema.Types.ObjectId,ref:"City"}],

    vehicleType:{type:Schema.Types.ObjectId, ref:"VehicleType"},

    
    minCharge:{
        type:Schema.Types.Decimal128,
        require:true,
    },
    perMinCharge:{
        type:Schema.Types.Decimal128,
        require:true,
    },
    cancelCharge:{
        type:Schema.Types.Decimal128,
        require:true,
    },
    bookingFee:{
        type:Schema.Types.Decimal128,
        require:true,
    },
    adminCommissionType:{
        type:String,
        require:true,
    },
    adminCommission:{
        type:Schema.Types.Decimal128,
        require:true,
    },
    status:{
        type:String,
        require:true,
        enum:["ACTIVE","INACTIVE"],
        default:"INACTIVE"
    },
    
    createdAt:{
        type:Date,
        immutable:true,
        default: Date.now()
    },
    perKMCharge:[{type:Schema.Types.ObjectId,ref:"PerKMCharge"}]
},{
    collection:"RentalFareCity"
})



module.exports = model("RentalFareCity",schema)