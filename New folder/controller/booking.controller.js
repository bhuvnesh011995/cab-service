const db = require("../model/index")


exports.addBooking = async function(req,res,next){
    let {
        bookingDate,
        runMode,
        bookingType,
        pickUp,
        drop,
        start,
        end,
        arrivedInfo,
        packageId,
        nightCharge,
        peakCharge,
        baseFareId,
        fareFrom,
        travelTime,
        travelDistance,
        extraTravelTime,
        extraTravelDistance,
        KMFare,
        timeFare,
        tripFare,
        promocodeDiscount,
        freeRide,
        tollFare,
        taxFare,
        payableFare,
        finalPayableFare,
        remainingPayableFare,
        driverTripCommission,
        adminTripCommission,
        driverCommission,
        adminCommission,
        driverInHand,
        adminInHand,
        payoutAmount,
        payoutType,
        success,
        status,
        riderId,
        driverId,
        vehicle
    } = req.body

}

exports.getAllBooking = async function(req,res,next){
    let bookings = await db.booking.find({})

    res.status(200).json({
        success:true,
        bookings
    })
}


exports.filterBooking = async function(req,res,next){
    let { country,state,city,status,bookingType} = req.query

    if(country){
        let countryDoc = await db.country.findOne({name:country})

        if(countryDoc) var countryId = countryDoc._id
        else countryId = null
    }else countryId= null

    if(state){
        let stateDoc = await db.state.findOne({name:country})

        if(stateDoc) var stateId = stateDoc._id
        else stateId = null
    }else stateId= null
    if(city){
        let cityDoc = await db.country.findOne({name:country})

        if(cityDoc) var cityId = cityDoc._id
        else cityId = null
    }else cityId= null

    let bookings = await db.booking.find({
        $or:[
            {"start.address.country":countryId},
            {"start.address.state":stateId},
            {"start.address.city":cityId},
            {"bookignType":bookingType},
            {"status":status},
        ]
    }).populate([
        {path:"runMode",select:{name:1}},
        {path:"driver",select:{firstName:1,lastName:1}},
        {path:"rider",select:{firstName:1,lastName:1,email:1}}
    ])
}