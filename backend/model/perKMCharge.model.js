const {Schema,model} = require("mongoose")

const schema = new Schema({
    minKM:{
        type:Number,
        default:0
    },
    maxKM:{
        type:Number
    },
    fare:{
        type:Number
    }
},{
    collection:"PerKMCharge"
})

module.exports = model("PerKMCharge",schema)