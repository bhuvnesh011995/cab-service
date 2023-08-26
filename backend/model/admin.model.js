const mongoose = require("mongoose")

const {Schema,model}  = mongoose

const adminSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required: true,
            unique:true
                   
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowarcase:true
        },
        password:{
            type:String,
            required:true
        },
        status:{
            type:String,
            enum:["ACTIVE","INACTIVE"],
            default:"INACTIVE"
        },
        createdAt:{
            type: Date,
            immutable: true,
            default: Date.now()
        },
       service:[{type:mongoose.Types.ObjectId,ref:"Services"}]
        
    },{
        collection:"Admin"
    }
)


module.exports = model("Admin",adminSchema);
