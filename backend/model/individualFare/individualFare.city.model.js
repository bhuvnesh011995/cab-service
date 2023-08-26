const {Schema,model} = require("mongoose");

let schema = new Schema({
    country:{type:Schema.Types.ObjectId,ref:"Country"},

    state:{type:Schema.Types.ObjectId,ref:"State"},
    city:{type:Schema.Types.ObjectId,ref:"City"},

    vehicleType:{type:Schema.Types.ObjectId, ref:"VehicleType"},

    baseFare:{
        type:Number,
        required:true,
    },
    minCharge:{
        type:Number,
        required:true,
    },
    perMinCharge:{
        type:Number,
        required:true,
    },
    cancelCharge:{
        type:Number,
        required:true,
    },
    bookingFee:{
        type:Number,
        required:true,
    },
    adminCommissionType:{
        type:String,
        required:true,
    },
    adminCommission:{
        type:Number,
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
    collection:"IndiFareCity"
})



module.exports = model("IndiFareCity",schema)