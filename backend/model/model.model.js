const mongoose = require("mongoose");
const { Schema,model} = mongoose;


let schema = new Schema({
    name:{
        type:String,
        require:true,
        lowarcase:true
    },
    year:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"INACTIVE"
    },
    vehicalType:{
        type:String,
        emun:["MINI","SUV","SEDAN","SUZUKI"]
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:Date.now()
    },
    make:{type: mongoose.Types.ObjectId, ref: "Make"}
},{
    collection:"Model"
})


module.exports = model("Model", schema)