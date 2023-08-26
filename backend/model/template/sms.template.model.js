const {Schema, model} = require("mongoose")

let schema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    forUsers:[{
        type:String,
        enum:["ADMIN","DRIVER","RIDER"],
        required:true
    }],
    status:{
        type:String,
        default:"INACTIVE",
        enum:["ACTIVE","INACTIVE"],
        required:true
    },
},{
    collection:"SmsTemplate",
    timestamps:true
})


module.exports = model("SmsTemplate",schema)