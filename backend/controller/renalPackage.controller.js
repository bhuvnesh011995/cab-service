const db = require("../model/index")


exports.addPackage = async function(req,res,next){
    const {name,maxDuration,maxDistance,status} = req.body;
    console.log(maxDistance)
    const package = await db.rentalPackage.create({
        name:name,
        maxDuration:maxDuration,
        maxDistance:maxDistance,
        status:status
    })

    res.status(200).json({
        success:true,
        package:package
    })
}


exports.getAllPackage = async function(req,res,next){
    const allPackage =await db.rentalPackage.find({}).select({name:1,_id:0}).lean()

    res.status(200).json({
        success:true,
        packages:allPackage
    })
}

exports.filterPackage = async function (req,res,next){
    const {name,status} = req.query

    if(!name && ! status){
        var packages = await db.rentalPackage.find({});

        res.status(200).json({
            success:true,
            packages:packages
        })
    }else{
        packages = await db.rentalPackage.find({
            $or:[
                {name:name},
                {status:status}
            ]
        })

        res.status(200).json({
            success:true,
            packages:packages
        })
    }
}