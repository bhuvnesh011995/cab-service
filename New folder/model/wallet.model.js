const {Schema,model} = require("mongoose")

const schema = new Schema({
    user:{type:Schema.Types.ObjectId,ref:"Rider"},
    balance:{
        type:Number,
        default:0
    }
},{
    timestamps:true,
    collection:"Wallet"
})

module.exports = model("Wallet",schema)