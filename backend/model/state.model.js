const {model, Schema} = require("mongoose")


const schema = new Schema({
    name:{
        type:String,
        require:true,
        lowercase:true
    },
    stateCode:{
        type:String,
        require:true
    },
    createAt:{
        type:Date,
        require:true,
        immutable:true,
        default:Date.now()
    },
    status:{
        type:String,
        default:"INACTIVE",
        enum:["ACTIVE","INACTIVE"]
    },
    country:{type:Schema.Types.ObjectId,ref:"Country"},
    city:[{type:Schema.Types.ObjectId,ref:"City"}]
},{
    collection:"State"
})

module.exports = model("State",schema)