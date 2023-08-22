const {Schema,model} = require("mongoose")
const Wallet = require("./wallet.model")

const schema = new Schema({
    amount:{
        type:Number,
        require:true
    },
    type:{
        type:String,
        require:true,
        enum:["debit",'credit'],
    },
    description:{
        type:String,
        require:true
    },
    wallet:{type:Schema.Types.ObjectId,ref:"Wallet",require:true}
},{
    timestamps:true,
    collection:"Transaction"
})



schema.post("save",async function (doc){
    const {type,wallet,amount} = doc;

    let tranSum = type === "debit" ? -amount : amount

    try {
        await Wallet.findOneAndUpdate({_id:wallet},{$inc:{balance:tranSum}})
        console.log('Wallet balance updated');
    }catch(error){
        console.error("error occoured", error)
    }
})



module.exports = model("Transaction",schema)





