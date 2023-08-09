const db = require("../model/index")

exports.addVehicle = async function (req,res,next){
    let {
        driverEmail,
        vehicleType,
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
        model,
        year,
        color
    } = req.body

    let admin =await db.admin.findOne({username:"admin"})

    let driver = await db.driver.findOne({email:driverEmail})

    let vehicletype = await db.vehicleType.findOne({name:vehicleType})

    let vehicleMake = await db.make.findOne({name:make})

    let vehicle = await db.vehicle.create({
        driver:driver._id,
        vehicleType:vehicletype._id,
        fuelType:fuelType,
        seatingCapacityName:seatingCapacityName,
        seatingCapacity:seatingCapacity,
        make:vehicleMake._id,
        "registration.number":registration.number,
        "registration.expiryDate":registration.expiryDate,
        "registration.verified":registration.verified,
        "registration.verifiedBy":registration.verified?admin._id:undefined,
        "insurance.expiryDate":insurance.expiryDate,
        "insurance.verified":insurance.verified,
        "insurance.verifiedBy":insurance.verified?admin._id:undefined,
        "permit.expiryDate":permit.expiryDate,
        "permit.verified":permit.verified,
        "permit.verifiedBy":permit.verified?admin._id:undefined,
        "pollutionCertificate.expiryDate":pollutionCertificate.expiryDate,
        "pollutionCertificate.verified":pollutionCertificate.verified,
        "pollutionCertificate.verifiedBy":pollutionCertificate.verified?admin._id:undefined,
        plateNo:plateNo,
        status:status,
        verified:verified,
        verifiedBy:verified?admin._id:undefined,
        model:model,
        year:year,
        color:color
    })

   let update =  await db.driver.findByIdAndUpdate(driver._id,{
        $push:{vehicle:vehicle._id}
    })



    res.status(200).json({
        success:true,
        message:"vehicle added successfully"
    })
    

}

exports.getAllVehicle = async function (req,res,next){
    let vehicles = await db.vehicle.find({})

    res.status(200).json({
        success:true,
        vehicles:vehicles
    })

}

exports.getVehicleByDriver = async function (req,res,next){

    let driver = await db.driver.findById(req.params.driverId)

    let vehicles = await db.vehicle.find({driver:driver._id}).populate([
        {path:"vehicleType", select:"name"},
        {path:"make",select:"name"}
    ])

res.status(200).json({
    success:true,
    vehicles
})

}


exports.getVehicleDetails = async function (req,res,next){
    let vehicleId  = req.params.vehicleId

    
}