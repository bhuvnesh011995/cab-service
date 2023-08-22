const db = require("../model/index")


exports.getWalletBalance = async function (req,res,next){
    const user = req.params.user

    let wallet = await db.wallet.findOne({user:user}).select({balance:1,_id:0})


    res.status(200).json({
        success:true,
        wallet
    })
}


exports.updateBalance = async function (req,res,next){
    const user = req.params.user;
    const {type,amount,description} = req.body;

    let wallet = await db.wallet.findOne({user:user})
    try{
        await db.transaction.create({
            amount,type,description,wallet:wallet._id
        })
    }catch(error){
        console.log("error occoured" , error)
    }

    res.status(200).json({
        success:true,
        message:`${type} transaction done of amount ${amount} in your wallet`
    })
}


exports.getalluser = async function(req,res,next){
    try{var walltes = await db.wallet.find().populate("user")}catch(err0r){console.log("error",error)}

    res.status(200).json({
        walltes
    })
}