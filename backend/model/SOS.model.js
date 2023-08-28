const {Schema,model}  = require("mongoose")

const schema = new Schema({
    booking:{type:Schema.Types.ObjectId,ref:"Booking"},

    userType:{
        type:String,
        required:true,
        enum:["Driver","Rider"]
    },

    user:{type:Schema.Types.ObjectId,refPath:"userType"},

    location:{type:Schema.Types.ObjectId,ref:"Location"},

    description:String
},{
    collection:"SOS",
    timestamps:true
})

module.exports = model("SOS",schema)