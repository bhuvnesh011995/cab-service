const {Schema,model} = require("mongoose")

const schema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"INACTIVE"
    },
    countryCode:{
        type:String,
        required:true,
        unique:true
    },
    dialCode:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:Date.now()
    },
    state:[{type:Schema.Types.ObjectId,ref:"State"}]
},{
    collection:"Country"
})

module.exports = model("Country",schema)