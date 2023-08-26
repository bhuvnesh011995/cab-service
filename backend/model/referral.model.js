const {Schema,model} = require("mongoose")

let schema = new Schema({
    title:{
        type:String,
        required:true
    },
    forUsers:[{
        type:String,
        required:true,
        enum:["ADMIN","DRIVER","RIDER"]
    }],
    status:{
        type:String,
        required:true,
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

    amountToApplier:Schema.Types.Decimal128,

    image:{
        data:Buffer,
        contentType:String
    }
},{
    timestamps:true,
    collection:"Referral"
})


module.exports = model("Referral",schema)