const db = require("../model/index")


exports.addPackage = async function(req,res,next){
    const {name,maxDuration,maxDistance} = req.body;

    const package = await db.rentalPackage.create({
        name:name,
        maxDuration:maxDuration,
        maxDistance:maxDistance
    })

    res.status(200).json({
        success:true,
        package:package
    })
}


exports.getAllPackage = async function(req,res,next){
    const allPackage = db.rentalPackage.find({}).select({name:1,_id:0}).lean()

    res.status(200).json({
        success:true,
        packages:allPackage
    })
}