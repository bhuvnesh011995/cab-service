const {Schema,model} = require("mongoose")

const schema = new Schema ({
    rider:{type:Schema.Types.ObjectId,ref:"Rider"},
    driver:{type:Schema.Types.ObjectId,ref:"Driver"},
    vehicle:{type:Schema.Types.ObjectId,ref:"Vehicle"}
},{
    timestamps:true,
    collection:"Booking"
})


module.exports = model("Booking",schema)