const db = require("../model/index");

exports.addRentalFare = async function (req, res, next) {
  const {
    package,
    packageFare,
    country,
    state,
    city,
    vehicleType,
    minCharge,
    perMinCharge,
    cancelCharge,
    bookingFee,
    adminCommissionType,
    adminCommission,
    status,
    perKMCharge
  } = req.body;
  let vehicleTypeDoc = await db.vehicleType.findOne({name:vehicleType})
  let rentalPackageDoc = await db.rentalPackage.findOne({
    name:package
  })

  let packageObj = {
    packageId:rentalPackageDoc._id,
    packageFare:packageFare
    }

  if(!state){
    var countryDoc = await db.country.findOne({name:country})
    var fare = await db.rentalFareCountry.create({
        country:countryDoc._id,
        vehicleType:vehicleTypeDoc._id,
        baseFare: baseFare,
        minCharge: minCharge,
        perMinCharge: perMinCharge,
        cancelCharge: cancelCharge,
        bookingFee: bookingFee,
        adminCommissionType: adminCommissionType,
        adminCommission: adminCommission,
        status:status
    })

    const allExtraCharge = await getId(perKMCharge)

  allExtraCharge.forEach(async (ele)=>{
    await db.indiFareState.updateOne({_id:fare._id},{$push:{perKMCharge:ele,package:packageObj}})
  })

  fare = await db.indiFareState.findOne({_id:fare._id})


  }else if (!city) {
    countryDoc = await db.country
      .findOne({ name: country })
      .populate({ path: "state", match: { name: state } });
      if (!countryDoc.state.length) {
    res.status(501).json({
      success: false,
      message: "no state found",
    }); return
  }
  let stateId = countryDoc.state[0]._id;

  fare = await db.indiFareState.create({
    country: countryDoc._id,
    vehicleType:vehicleTypeDoc._id,
    state: stateId,
    baseFare: baseFare,
    minCharge: minCharge,
    perMinCharge: perMinCharge,
    cancelCharge: cancelCharge,
    bookingFee: bookingFee,
    adminCommissionType: adminCommissionType,
    adminCommission: adminCommission,
    status:status
  });

  const allExtraCharge = await getId(perKMCharge)

  allExtraCharge.forEach(async (ele)=>{
    await db.indiFareState.updateOne({_id:fare._id},{
        $push:{
            perKMCharge:ele,
            package:packageObj
    }})
  })

  fare = await db.indiFareState.findOne({_id:fare._id})

  } else{
    countryDoc = await db.country
      .findOne({ name: country })
      .populate({ 
        path: "state",
        match: { name: state },
        populate:{
            path:"city",
            model:"City",
            match:{name:city}
        } });
        if (!countryDoc.state.length) {
            res.status(501).json({
              success: false,
              message: "no state found",
            });return
          }
          if (!countryDoc.state[0].city.length) {
            res.status(501).json({
              success: false,
              message: "no city found",
            });return
          }

          const stateId = countryDoc.state[0]._id;
          const cityId = countryDoc.state[0].city[0]._id;

           fare = await db.indiFareCity.create({
            country: countryDoc._id,
            vehicleType:vehicleTypeDoc._id,
            state: stateId,
            city:cityId,
            baseFare: baseFare,
            minCharge: minCharge,
            perMinCharge: perMinCharge,
            cancelCharge: cancelCharge,
            bookingFee: bookingFee,
            adminCommissionType: adminCommissionType,
            adminCommission: adminCommission,
            status:status
          });

          const allExtraCharge = await getId(perKMCharge)

         allExtraCharge.forEach(async (ele)=>{
            await db.indiFareCity.updateOne({_id:fare._id},{$push:{perKMCharge:ele,package:packageObj}})
        })

        fare = await db.indiFareCity.findOne({_id:fare._id})
  }
  async function getId(obj) {
    let arr = await Promise.all(obj.map(async (ele)=>{
    var perkmcharge = await db.perKMCharge.findOne({
          minKM: ele.minKM,
          maxKM: ele.maxKM,
          fare: ele.fare,
        });
        if (!perkmcharge) {
           perkmcharge = await db.perKMCharge.create({
            minKM: ele.minKM,
            maxKM: ele.maxKM,
            fare: ele.fare,
          });
        }
        return perkmcharge._id
        }))
        console.log("arr2",arr)
    
        return arr
      }

      res.status(200).json({
        success:true,
        data:fare
      })
};


