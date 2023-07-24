const {Schema,model} = require("mongoose");

let schema = new Schema({
    country:{type:Schema.Types.ObjectId,ref:"Country"},

    state:{type:Schema.Types.ObjectId,ref:"State"},

    vehicleType:{type:Schema.Types.ObjectId, ref:"VehicleType"},

    baseFare:{
        type:Schema.Types.Decimal128,
        require:true,
    },
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
        enum:["ACTIVE","INACTIVE"],
        default:"INACTIVE"
    },
    perKMCharge:[{type:Schema.Types.ObjectId,ref:"PerKMCharge"}]
},{
    collection:"IndiFareState"
})



module.exports = model("IndiFareState",schema)