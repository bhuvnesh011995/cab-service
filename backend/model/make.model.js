const mongoose = require("mongoose");
const {Schema,model}= mongoose;



let schema = new Schema({
    name:{
        type:String,
      
    },
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"INACTIVE"
    },
    createdAt:{
        type: Date,
        immutable: true,
        default: Date.now()
    },
    model:[{type:mongoose.Types.ObjectId,ref:"Model"}]
},{
    collection:"Make"
})


module.exports= model("Make",schema)

