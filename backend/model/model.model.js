const mongoose = require("mongoose");
const { Schema,model} = mongoose;


let schema = new Schema({
    name:{
        type:String,
        required:true,
        lowarcase:true
    },
    year:{
        type:Number,
        // required:true
    },
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"INACTIVE"
    },
    vehicleType:{
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