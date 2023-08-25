const {Schema,model} = require("mongoose")

let schema = new Schema({
    title:{
        type:String,
        require:true
    },
    forUsers:[{
        type:String,
        require:true,
        enum:["ADMIN","DRIVER","RIDER"]
    }],
    status:{
        type:String,
        require:true,
        enum:["ACTIVE","INACTIVE"]
    },

    country:{type:Schema.Types.ObjectId,ref:"Country"},
    state:{type:Schema.Types.ObjectId,ref:"State"},
    city:{type:Schema.Types.ObjectId,ref:"City"},

    freeRideToReferrer:Boolean,

    maxFreeRideToReferrer:Number,

    amountToReferrer:Schema.Types.Decimal128,

    maxAmountToReferrer:Schema.Types.Decimal128,

    freeRideToApplier:Boolean,

    maxFreeRideToApplier:Number,

    amountToApplier:Schema.Types.Decimal128,

    maxAmountToApplier:Schema.Types.Decimal128,

    image:{
        data:Buffer,
        contentType:String
    }
},{
    timestamps:true,
    collection:"Referral"
})


module.exports = model("Referral",schema)