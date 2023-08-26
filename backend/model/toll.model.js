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

    location:{
        latitude:String,
        longitude:String,
    }
},{
    timestamps:true,
    collection:"Toll"
})


module.exports = model("Toll",schema)