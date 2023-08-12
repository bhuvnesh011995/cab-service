const {Schema,model} = require("mongoose")

const schema = new Schema ({
    runMode:{type:Schema.Types.ObjectId,ref:"RunMode"},
    bookingType:String,
    booingInfo:{
        country:{type:Schema.Types.ObjectId,ref:"Country"},
        state:{type:Schema.Types.ObjectId,ref:"State"},
        city:{type:Schema.Types.ObjectId,ref:"City"},
        pickUp:{
            address:{
                type:String,
                required:true,
                lowercase:true
            },
            location:{
                latitude:String,
                longitude:String
            }
        },
        drop:{
            address:{
                type:String,
                required:true,
                lowercase:true
            },
            location:{
                latitude:String,
                longitude:String
            }
        },
        bookingDate:Date,
    },
    rideInfo:{
        start:{
            location:{
                longitude:String,
                latitude:String
            },
            date:Date
        },
        end:{
            location:{
                    longitude:String,
                    latitude:String
            },
            date:Date
    },
    },
    
    package:{type:Schema.Types.ObjectId,ref:"RentalPackage"},

    applicableCharges:{
        baseFare:{type:Schema.Types.ObjectId,refPath:"fareFrom"},
        nightCharge:Schema.Types.Decimal128,
        peakCharge:Schema.Types.Decimal128
    },
    fareFrom:{type:String,required:true,enum:["IndiFareCity","IndiFareCountry","IndiFareState","RentalFareCity","RentalFareCountry","RentalFareState"]},

    bookingSummery:{
        travelTime:Number,
        travelDistance:Schema.Types.Decimal128,
        extraTravelTime:Number,
        extraTravelDistance:Schema.Types.Decimal128,
        baseFare:Schema.Types.Decimal128,
        KMFare:Schema.Types.Decimal128,
        timeFare:Schema.Types.Decimal128,
        nightFare:Schema.Types.Decimal128,
        peakFare:Schema.Types.Decimal128,
        tripFare:Schema.Types.Decimal128,
        promocodeDiscount:String,
        freeRide:String,
        tollFare:Schema.Types.Decimal128,
        taxFare:Schema.Types.Decimal128,
        payableFare:Schema.Types.Decimal128,
        walletMoney:Schema.Types.Decimal128,
        finalPayableFare:Schema.Types.Decimal128,
        remainingPayableFare:Schema.Types.Decimal128
    },

    distributionInfo:{
        driverTripCommission:Schema.Types.Decimal128,
        adminTripCommission:Schema.Types.Decimal128,
        driverCommission:Schema.Types.Decimal128,
        adminCommission:Schema.Types.Decimal128,
        driverInHand:Schema.Types.Decimal128,
        adminInHand:Schema.Types.Decimal128,
        payoutAmount:Schema.Types.Decimal128,
        payoutType:String
    },
    status:{
        type:String,
        default:"INACTIVE",
        enum:["ACTIVE","INACTIVE"]
    },
    success:{
        type:String,
        require:true,
        enum:["COMPLETED","CANCELLED","PENDING"]
    },
    createdBy:{},
    rider:{type:Schema.Types.ObjectId,ref:"Rider"},
    driver:{type:Schema.Types.ObjectId,ref:"Driver"},
    vehicle:{type:Schema.Types.ObjectId,ref:"Vehicle"}
},{
    timestamps:true,
    collection:"Booking"
})


module.exports = model("Booking",schema)