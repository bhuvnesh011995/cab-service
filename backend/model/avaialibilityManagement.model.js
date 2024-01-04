const {Schema,model} = require("mongoose")

const schema = new Schema({
   
    country:{type:String},

    state:{type:String},

    city:{type:String},
    pinCodeMapping:{
        type: String,
    }

    
},{
    timestamps:true,
    collection:"avaialibilityManagement"
})

module.exports = model("avaialibilityManagement",schema)