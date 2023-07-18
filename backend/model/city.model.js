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
    country:{type:Schema.Types.ObjectId,ref:"Country"},
    state:{type:Schema.Types.ObjectId,ref:"State"},
    cityService:[{
        vehicalType:{type:Schema.Types.ObjectId,ref:"VehicalType"},
        runMode:[{type:Schema.Types.ObjectId,ref:"runMode"}]            
    }]
},{
    collection:"City"
})

module.exports  = model("City",schema)