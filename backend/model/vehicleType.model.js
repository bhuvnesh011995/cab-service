const {Schema,model}= require("mongoose");

let schema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    seatingCapacityName:{
        type:String,
        required:true
    },
    seatingCapacity:{
        type:Number,
        required:true,
    },
    img:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["ACTIVE","INACTIVE"],
        default:"INACTIVE"
    },
    runMode:[{type:Schema.Types.ObjectId,ref:"RunMode"}]
},{
    collection:"VehicleType"
})


module.exports = model("VehicleType",schema);