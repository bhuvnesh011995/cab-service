const {Schema,model} = require("mongoose")

let schema = new Schema({
    title:{type:String,require:true},
    subject:{type:String,require:true},
    body:{type:String,require:true},
    forUsers:[{type:String,enum:["ADMIN","DRIVER","RIDER"]}],
    status:{type:String,require:true,default:"INACTIVE",enum:["ACTIVE","INACTIVE"]}
},{
    collection:"EmailTemplate",
    timestamps:true
})


module.exports = model("EmailTemplate",schema)