const {Schema,model} = require("mongoose")


const schema = new Schema({
    name:{
        type:String,
        require:true,
        unique:true,
    },
    maxDuration:{
        type:String,
        require:true
    },
    maxDistance:{
        type:Schema.Types.Decimal128,
        require:true
    },
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"INACTIVE"
    },
    createdAt:{
        type:Date,
        immutable:true,
        default: Date.now()
    },
},{
    collection:"RentalPackage"
})

module.exports = model("RentalPackage",schema)