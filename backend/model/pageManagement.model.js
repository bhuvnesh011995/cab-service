const {Schema,model} = require("mongoose");


const schema = new Schema({
    name:{
        type:String,
        require:true
    },
    metaDescription:{
        type:String,
        require:true
    },
    metaKey:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:Date.now()
    }
},{
    collection:"Page"
})

module.exports = model("Page",schema)