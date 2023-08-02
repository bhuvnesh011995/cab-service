const {Schema,model} = require("mongoose")


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
    wallet:{type:Schema.Types.ObjectId,ref:"Wallet"}
},{
    timestamps:true,
    collection:"Transation"
})

module.exports = model("Transation",schema)