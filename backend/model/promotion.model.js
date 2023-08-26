const {Schema,model} = require("mongoose")

const schema = new Schema({
    title:{
        type:String,
        required:true
    },
    country:{type:Schema.Types.ObjectId,ref:"Country"},

    state:{type:Schema.Types.ObjectId,ref:"State"},

    city:{type:Schema.Types.ObjectId,ref:"City"},

    forUsers:[{type:String,required:true,enum:["ADMIN","DRIVER","RIDER"]}],

    image:{data:Buffer,contentType:String},

    status:{
        type:String,
        required:true,
        default:"INACTIVE",
        enum:["ACTIVE","INACTIVE"]
    },
    description:{type:String}
},{
    timestamps:true,
    collection:"Promotion"
})

module.exports = model("Promotion",schema)