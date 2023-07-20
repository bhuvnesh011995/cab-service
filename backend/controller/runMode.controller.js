const db = require("../model/index");

exports.getAllRunMode = async function (req,res,next){
    let runModes = await db.runMode.find({}).select({name:1,_id:0})

    res.status(200).json({
        success:true,
        data:runModes
    })
}