const {Schema, model} = require("mongoose")

let schema = new Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    forUsers:[{
        type:String,
        enum:["ADMIN","DRIVER","RIDER"],
        require:true
    }],
    status:{
        type:String,
        default:"INACTIVE",
        enum:["ACTIVE","INACTIVE"],
        require:true
    },
},{
    collection:"SmsTemplate",
    timestamps:true
})


module.exports = model("SmsTemplate",schema)