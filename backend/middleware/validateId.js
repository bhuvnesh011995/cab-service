const db = require("../model/index")
const mongoose = require("mongoose")

exports.validateCountryId = async function(req,res,next){

    if(req.query.countryId && !mongoose.Types.ObjectId.isValid(req.query.countryId)){
       req.query.countryId = null
    }
    if(req.params.countryId && !mongoose.Types.ObjectId.isValid(req.params.countryId)){
        req.params.countryId = null
     }
     if(req.body.countryId && !mongoose.Types.ObjectId.isValid(req.body.countryId)){
        req.body.countryId = null
     }

    next()
}

exports.validateCityId = async function(req,res,next){
    let {cityId} = req.query

    if(req.query.cityId && !mongoose.Types.ObjectId.isValid(req.query.cityId)){
       req.query.cityId = null
    }
    if(req.params.cityId && !mongoose.Types.ObjectId.isValid(req.params.cityId)){
        req.params.cityId = null
     }
     if(req.body.cityId && !mongoose.Types.ObjectId.isValid(req.body.cityId)){
        req.body.cityId = null
     }
    
    next()
}

exports.validateStateId = async function(req,res,next){
    let {stateId} = req.query

    if(req.query.stateId && !mongoose.Types.ObjectId.isValid(req.query.stateId)){
       req.query.stateId = null
    }
    if(req.params.stateId && !mongoose.Types.ObjectId.isValid(req.params.stateId)){
        req.params.stateId = null
     }
     if(req.body.stateId && !mongoose.Types.ObjectId.isValid(req.body.stateId)){
        req.body.stateId = null
     }
    
    next()
}




exports.validateUserId = async function(req,res,next){


   if(req.query.userId && !mongoose.Types.ObjectId.isValid(req.query.userId)) req.query.userId = null

   if(req.params.userId && !mongoose.Types.ObjectId.isValid(req.params.userId)) req.params.userId = null


   if(req.body.userId && !mongoose.Types.ObjectId.isValid(req.body.userId)) req.body.userId = null


   if(req.body.riderId && !mongoose.Types.ObjectId.isValid(req.body.riderId)) req.body.riderId = null


   if(req.body.deiverId && !mongoose.Types.ObjectId.isValid(req.body.deiverId)) req.body.deiverId = null

   next()

}