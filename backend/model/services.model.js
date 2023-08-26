const mongoose  = require("mongoose")
const  {Schema,model} = mongoose;



let servicesSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    admin:[{type:mongoose.Types.ObjectId,ref:"Admin"}]
},{
    collection:"Services"
})

module.exports = model("Services",servicesSchema)