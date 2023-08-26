const {Schema,model} = require("mongoose")

const schema = new Schema({
    balance:{
        type:Number,
        default:0
    }
},{
    timestamps:true,
    collection:"Wallet"
})

module.exports = model("Wallet",schema)