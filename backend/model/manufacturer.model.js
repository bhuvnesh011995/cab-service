const mongoose = require("mongoose");
const { Schema,model} = mongoose;
let schema = new Schema({
    name:{
        type:String,
    },
    status:{
        type:String,
      
        enum:["ACTIVE","INACTIVE"],
        default:"INACTIVE"
    },
    model:{type:mongoose.Types.ObjectId,ref:"Model"}
},{
    collection:"manufacturer",
    timestamps:true

})

module.exports = model("manufacturer",schema);