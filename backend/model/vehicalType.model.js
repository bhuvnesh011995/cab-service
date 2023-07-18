const {Schema,model}= require("mongoose");

let schema = new Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    seatingCapacityName:{
        type:String,
        require:true
    },
    seatingCapacity:{
        type:Number,
        require:true,
    },
    img:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true,
        enum:["ACTIVE","INACTIVE"],
        default:"INACTIVE"
    },
    runMode:[{type:Schema.Types.ObjectId,ref:"RunMode"}]
},{
    collection:"VehicalType"
})


module.exports = model("VehicalType",schema);