const db = require("../model/index")


exports.addReferral = async function(req,res,next){
    const {
        forUsers,
        countryId,
        stateId,
        cityId,
        title,
        status,
        freeRideToReferrer,
        maxFreeRideToReferrer,
        amountToReferrer,
        maxAmountToReferrer,
        freeRideToApplier,
        maxFreeRideToApplier,
        amountToApplier,
        maxAmountToApplier
    } = req.body;



    await db.referral.create({
        country:countryId,state:stateId,city:cityId,
        forUsers,
        title,
        status,
        freeRideToReferrer,
        maxFreeRideToReferrer,
        amountToReferrer,
        maxAmountToReferrer,
        freeRideToApplier,
        maxFreeRideToApplier,
        amountToApplier,
        maxAmountToApplier
    })

    res.status(200).json({
        success:true,
        message:"referral created successful"
    })
}




exports.filterReferal = async function(req,res,next){
    const {title,status,forUsers} = req.query

    if(!title && !status &&!forUsers){
       var referrals = db.referral.find({}) 
    }else{
        referrals = db.referral.find({
            $or:[
                {title},
                {status},
                {forUsers}
            ]
        })
    }

    res.status(200).json({
        success:true,
        referrals
    })
    
}