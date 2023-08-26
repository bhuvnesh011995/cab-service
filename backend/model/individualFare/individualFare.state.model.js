const {Schema,model} = require("mongoose");

let schema = new Schema({
    country:{type:Schema.Types.ObjectId,ref:"Country"},

    state:{type:Schema.Types.ObjectId,ref:"State"},

    vehicleType:{type:Schema.Types.ObjectId, ref:"VehicleType"},

    baseFare:{
        type:Schema.Types.Decimal128,
        required:true,
    },
    minCharge:{
        type:Schema.Types.Decimal128,
        required:true,
    },
    perMinCharge:{
        type:Schema.Types.Decimal128,
        required:true,
    },
    cancelCharge:{
        type:Schema.Types.Decimal128,
        required:true,
    },
    bookingFee:{
        type:Schema.Types.Decimal128,
        required:true,
    },
    adminCommissionType:{
        type:String,
        required:true,
    },
    adminCommission:{
        type:Schema.Types.Decimal128,
        required:true,
    },
    status:{
        type:String,
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
    collection:"IndiFareState"
})



module.exports = model("IndiFareState",schema)