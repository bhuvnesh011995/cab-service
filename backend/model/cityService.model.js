const {Schema,model} = require("mongoose")

const schema = new Schema({
    city:{type:Schema.Types.ObjectId,ref:"City"},
   cityService:[{
    vehicalType:{type:Schema.Types.ObjectId,ref:"VehicalType"},
    runMode:[{type:Schema.Types.ObjectId,ref:"runMode"}]            
}]
},{
    collection:"CityService"
})

module.exports = model("CityService",schema)