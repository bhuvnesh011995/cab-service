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