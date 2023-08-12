const {Schema,model}= require("mongoose")


const schema = new Schema({
    name:{
        type:String,
        require:true,
        lowercase:true
    },
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"INACTIVE"
    },
    utcOffset:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:Date.now()
    },
    country:{type:Schema.Types.ObjectId,ref:"Country"},
    state:{type:Schema.Types.ObjectId,ref:"State"},
    cityService:[{
        vehicleType:{type:Schema.Types.ObjectId,ref:"VehicleType"},
        runMode:[{type:Schema.Types.ObjectId,ref:"runMode"}]            
    }]
},{
    collection:"City"
})

module.exports  = model("City",schema)