const {Schema,model} = require("mongoose")

const schema = new Schema({
    name:{
        type:String,
        reqquire:true
    }
},{
    collection:"RunMode"
})

module.exports = model("RunMode",schema)