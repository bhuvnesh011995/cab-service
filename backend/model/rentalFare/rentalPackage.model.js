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
    MaxDistance:{
        type:Schema.Types.Decimal128,
        require:true
    }
},{
    collection:"RentalPackage"
})

module.exports = model("RentalPackage",schema)