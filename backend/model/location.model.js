const {Schema,model} = require("mongoose")

const schema = new Schema({
    lat:String,

    lng:String
},{
    collection:"Location"
})


module.exports = model("Location",schema)