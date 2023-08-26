const {Schema,model} = require("mongoose");


const schema = new Schema({
    name:{
        type:String,
        required:true
    },
    metaDescription:{
        type:String,
        required:true
    },
    metaKey:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:Date.now()
    }
},{
    collection:"Page"
})


  schema.index({
    name:"text",
    metaDescription:"text",
    metaKey:"text"
})




module.exports = model("Page",schema)