const db = require("../model/index")

exports.addVehicle = async function (req,res,next){
    let {
        vehicletype,
        fuelType,
        seatingCapacityName,
        seatingCapacity,
        make,
        registration,
        insurance,
        permit,
        pollutionCertificate,
        plateNo,
        status,
        verified,
        driver,
        model,
        year,
        color
    } = req.body


    

}

exports.getAllVehicle = async function (req,res,next){

}

exports.filter = async function (req,res,next){

}