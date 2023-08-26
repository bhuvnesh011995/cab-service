const {Schema,model} = require("mongoose")

const schema = new Schema({
    name:{
        type:String,
        required:true
    }
},{
    collection:"RunMode"
})

module.exports = model("RunMode",schema)