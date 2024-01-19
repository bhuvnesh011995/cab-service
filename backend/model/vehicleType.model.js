const {Schema,model}= require("mongoose");

let schema = new Schema({
    name:{
        type:String,
    },
    seatingCapacityName:{
        type:String,
       
    },
    seatingCapacity:{
        type:Number,
    },
    file:{
        type:String, 
    },
    status:{
        type:String,
      
        enum:["ACTIVE","INACTIVE"],
        default:"INACTIVE"
    },
    runMode:[{type:Schema.Types.ObjectId,ref:"RunMode"}]
},{
    collection:"VehicleType",
    timestamps:true

})

module.exports = model("VehicleType",schema);