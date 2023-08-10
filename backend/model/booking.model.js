const {Schema,model} = require("mongoose")

const schema = new Schema ({
    bookingDate:Date,
    runMode:{type:Schema.Types.ObjectId,ref:"RunMode"},
    bookingType:String,
    pickUp:{
        address:{
            place:String,
            city:{type:Schema.Types.ObjectId,ref:"City"},
            state:{type:Schema.Types.ObjectId,ref:"State"},
            country:{type:Schema.Types.ObjectId,ref:"Country"},
            map:{
                altitude:String,
                latitude:String
            }
        },

    },
    drop:{
        address:{
            place:String,
            city:{type:Schema.Types.ObjectId,ref:"City"},
            state:{type:Schema.Types.ObjectId,ref:"State"},
            country:{type:Schema.Types.ObjectId,ref:"Country"},
            map:{
                altitude:String,
                latitude:String
            }
        },
    },
    start:{
        map:{
            altitude:String,
            latitude:String
        },
        date:Date
    },
    start:{
        map:{
            altitude:String,
            latitude:String
        },
        date:Date
    },
    package:{type:Schema.Types.ObjectId,ref:"RentalPackage"},
    status:{
        type:String,
        default:"INACTIVE",
        enum:["ACTIVE","INACTIVE"]
    },
    rider:{type:Schema.Types.ObjectId,ref:"Rider"},
    driver:{type:Schema.Types.ObjectId,ref:"Driver"},
    vehicle:{type:Schema.Types.ObjectId,ref:"Vehicle"}
},{
    timestamps:true,
    collection:"Booking"
})


module.exports = model("Booking",schema)