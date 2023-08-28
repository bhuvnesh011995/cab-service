const db = require("../model/index")

exports.addSos = async function(req,res,next){
    const {bookingId,userType,userId,location,description} = req.body;

    let locationDoc = await db.location.create({
        lat:location.lat,
        lng:location.lng
    })

    await db.sos.create({
        booking:bookingId,
        userType,
        user:userId,
        location:locationDoc._id,
        description
    })

    res.status(200).json({
        success:true,
        message:"sos Created Successfully"
    })


}


exports.filterSos = async function(req,res,next){
    const {userType} = req.query

    if(!userType){
        var sos = await db.sos.find({}).populate([
            { path:"booking",select:""},{path:"user"},{path:"location"}
        ]).lean()
    }else{
        sos = await db.sos.find(userType).populate([
           { path:"booking"},{path:"user"},{path:"location"}
        ]).lean()
    }

    res.status(200).json({
        success:true,
        sos
    })
}