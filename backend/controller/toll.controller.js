const db = require("../model/index")


exports.addToll = async function(req,res,next){
    const {
        title,
        amount,
        status,
        location,
    } = req.body

    console.log(req.body)

    let locationDoc = await db.location.create({
        lat:location.lat,
        lng:location.lng
    })


    await db.toll.create({
        title,
        amount,
        status,
        location:locationDoc._id
    })



    res.status(200).json({
        success:true,
        message:"toll added successfully"
    })
}


exports.filterToll = async function(req,res,next){
    const {title,status} = req.query


    if(!title && !status){
        var tolls = await db.toll.find({}).populate("location")
    }else{
        tolls = await db.toll.find({
            $or:[
                {title},
                {status}
            ]
        }).populate("location")
    }

    res.status(200).json({
        success:true,
        tolls
    })

}