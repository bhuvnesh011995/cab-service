const {Schema,model} = require("mongoose")

const schema = new Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["ACTIVE","INACTIVE"]
    },
    amount:Schema.Types.Decimal128,

    location:{type:Schema.Types.ObjectId,ref:"Location"}
},{
    timestamps:true,
    collection:"Toll"
})


module.exports = model("Toll",schema)