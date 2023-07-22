const {Schema,model} = require("mongoose");

let schema = new Schema({
    country:{type:Schema.Types.ObjectId,ref:"Country"},

    state:{type:Schema.Types.ObjectId,ref:"State"},

    vehicleType:{type:Schema.Types.ObjectId, ref:"VehicleType"},

    baseFare:{
        type:Number,
        require:true,
    },
    minCharge:{
        type:Number,
        require:true,
    },
    perMinCharge:{
        type:Number,
        require:true,
    },
    cancelCharge:{
        type:Number,
        require:true,
    },
    bookingFee:{
        type:Number,
        require:true,
    },
    adminCommissionType:{
        type:String,
        require:true,
    },
    adminCommission:{
        type:Number,
        require:true,
    },
    perKMCharge:{type:Schema.Types.ObjectId,ref:"PerKMCharge"}
},{
    collection:"IndiFareState"
})



module.exports = model("IndiFareState",schema)