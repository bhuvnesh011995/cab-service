const Model = require("../model/model.model")
const Make= require("../model/make.model")



exports.addModel = async function(req,res,next){
    const {name,make,status,year} = req.body

try{ 
    const makeDoc = await Make.findOne({name:make})

    const model = await Model.create({
        name:name,
        status:status,
        year:year,
        make:makeDoc._id
    })

    await Make.updateOne({name:make},{
        $push:{model:model._id}
    })
    

    res.status(200).json({
        success:true,
        data:JSON.stringify(makeDoc)
    })}catch(e){
        res.status(500).json({
            success:false,
            error:e.message
        })
    }
}


exports.getModel = async function(req,res,next){
    let {name,make,status,year} = req.query
    
    const models = await Model.find({name:name}).populate("make").exec()
    
    res.status(200).json({
        success:true,
        data:models
    })
}


exports.filterModel = async function(req,res,next){
    let {name,make,status} = req.query
    
    let models;

    try{
        if(!name && !make &&!status){
            models = await Model.find({}).populate({path:"make",select:"name"}).lean()
        }else{
            if(make.length){
                const makeDoc = await Make.findOne({name:make})
                make = makeDoc._id
            }
            else make = null
            models = await Model.find({
                $or:[
                    {name:name},
                    {make:make},
                    {status:status}
                ]
            }).populate({path:"make",select:"name"})
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:"some error happen",
            error:err.message
        })
        return
    }
    res.status(200).json({
        success:true,
        modelList:models
    })
}

