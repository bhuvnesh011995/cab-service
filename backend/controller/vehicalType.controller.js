const db = require("../model/index")

exports.addVehicalType = async function (req,res,next){
    const {img,name,runModes,seatingCapacity,seatingCapacityName,status} = req.body

    const runModeIds = [];

    for(let i=0;i<runModes.length;i++){
        const runMode = await db.runMode.findOne({name:runModes[i]})
        runModeIds.push(runMode._id)
    }

    await db.vehicalType.create({
        name:name,
        img:img,
        seatingCapacityName:seatingCapacityName,
        seatingCapacity:seatingCapacity,
        status:status,
        runMode:runModeIds
    })

    res.status(200).json({
        success:true,
        message:"vehical type added with runmodes"
    })
}