const db = require("../model/index")


exports.addToll = async function(req,res,next){
    const {
        title,
        amount,
        status,
        location,
    } = req.body


    await db.toll.create({
        title,
        amount,
        status,
        "location.latitude":location.latitude,
        "location.longitude":location.longitude,
    })



    res.status(200).json({
        success:true,
        message:"toll added successfully"
    })
}


exports.filterToll = async function(req,res,next){
    const {title,status} = req.query


    if(!title && !status){
        var tolls = await db.toll.find({})
    }else{
        tolls = await db.toll.find({
            $or:[
                {title},
                {status}
            ]
        })
    }

    res.status(200).json({
        success:true,
        tolls
    })

}