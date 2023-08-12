const admin = require("../model/admin.model");
const startofday = require("date-fns/startOfDay")
const endofday = require("date-fns/endOfDay")

// filter admins using name,username,status,and date

exports.filter = async function(req,res,next){

    let {name,username,email,status,from,to} = req.query
    let admins;
    if(!name&&!username&&!email&&!status&&!from&&!to){
        admins = await admin.find();
    }else{
        if(from) from = startofday(new Date(from))
    else if(to&&!from) from =startofday(new Date(0,1,1));
    else from = Date.now();
    if(to) to = endofday(new Date(to))
    else to = Date.now();
    
    admins = await admin.find({
        $or:[
            {name:name},
            {status:status},
            {username:username},
            {createdAt:{
                $gte:from ,
                $lte: to
            }}
        ]
    })
    }
    
    if(!admins) return res.status(200).send("no admin found").end()

    res.status(200).json(admins).end()
}



// delete admin function

exports.deleteAdmin = async function(req,res,next){
    let {username} = req.params;

    try{
        await admin.deleteOne({username:username})

        res.status(200).json({
            success:true,
            message:"admin deleted"
        })
    }catch(e){
        res.status(500).json({
            success:false,
            message:"some internal error happen",
            error:e.message
        })
    }
}
