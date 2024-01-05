const {Schema,model}  = require("mongoose")
const { schema, schema } = require("./vehicleType.model")
 let schema = new Schema({
    vehicleCategory:{
        type:String
    },
    status:{
        type:String
    } 
 },{
    collection:"vehicleCategory"
 })
 model.exports = model("vehicleCategory",schema)