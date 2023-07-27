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
        minCharge: minCharge,
        perMinCharge: perMinCharge,
        cancelCharge: cancelCharge,
        bookingFee: bookingFee,
        adminCommissionType: adminCommissionType,
        adminCommission: adminCommission,
        status:status
    })

    console.log(fare)

    const allExtraCharge = await getId(perKMCharge)

  allExtraCharge.forEach(async (ele)=>{
    await db.rentalFareCountry.updateOne({_id:fare._id},{$push:{perKMCharge:ele}})
  })
  await db.rentalFareCountry.updateOne({_id:fare._id},{$push:{package:packageObj}})

  fare = await db.rentalFareCountry.findOne({_id:fare._id})


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

  fare = await db.rentalFareState.create({
    country: countryDoc._id,
    vehicleType:vehicleTypeDoc._id,
    state: stateId,
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
    await db.rentalFareState.updateOne({_id:fare._id},{
        $push:{
            perKMCharge:ele
    }})
  })
  await db.rentalFareState.updateOne({_id:fare._id},{$push:{package:packageObj}})


  fare = await db.rentalFareState.findOne({_id:fare._id})

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

           fare = await db.rentalFareCity.create({
            country: countryDoc._id,
            vehicleType:vehicleTypeDoc._id,
            state: stateId,
            city:cityId,
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
            await db.rentalFareCity.updateOne({_id:fare._id},{$push:{perKMCharge:ele}})
        })
        await db.rentalFareCity.updateOne({_id:fare._id},{$push:{package:packageObj}})


        fare = await db.rentalFareCity.findOne({_id:fare._id})
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
    
        return arr
      }

      res.status(200).json({
        success:true,
        data:fare
      })
};


exports.filterRentalFare = async function (req,res,next){
  let {country,state,city,status,vehicleType,package} = req.query;
  if(!country &&!state&&!city&&!status&&!vehicleType&&!package){
    let countryFare = await db.rentalFareCountry.find({}).populate([
    {path:"package",populate:{
    path:"packageId",model:"RentalPackage",select:"name"
  }},
  {path:"country",select:"name"},
  {path:"vehicleType",select:"name"}])

  let stateFare = await db.rentalFareState.find({}).populate([
      {path:"package",populate:{
        path:"packageId",model:"RentalPackage",select:"name"
      }},
      {path:"country",select:"name"},
      {path:"state",select:"name"},
      {path:"vehicleType",select:"name"}
  ])

  let cityFare = await db.rentalFareCity.find({}).populate([
    {path:"package",populate:{
      path:"packageId",model:"RentalPackage",select:"name"
    }},
      {path:"country",select:"name"},
      {path:"state",select:"name"},
      {path:"vehicleType",select:"name"},
      {path:"city",select:"name"},
  ])

  let allFare = [...countryFare,...stateFare,...cityFare]

  res.status(200).json({
      success:true,
      allRentalFare:allFare
  }); 
  return
  }else{
    if(vehicleType){
      var vehicleTypeDoc =await db.vehicleType.findOne({name:vehicleType})
      console.log(vehicleTypeDoc)
      vehicleType = vehicleTypeDoc._id
    }
  
    if(country){
        let countryDoc = await db.country.findOne({name:country})
        country = countryDoc._id
    }else country = null
    if(state){
      let stateDoc = await db.state.findOne({
        name:state
      })
      state = stateDoc._id
    }else state = null
    
    if(city){
      let cityDoc = await db.city.findOne({name:city})
      city = cityDoc._id
    }else city = null

    if(package){
      let packageDoc = await db.rentalPackage.findOne({name:package});
        package = packageDoc._id
    }else package = null

    let countryFare = await db.rentalFareCountry.find({
      $or:[
        {"package.packageId":package},
        {country:country},
        {status:status},
        {vehicleType:vehicleType},
      ]
    }).populate([{path:"country",select:"name"},{path:"vehicleType",select:"name"}])

    let stateFare = await db.rentalFareState.find({
      $or:[
        {"package.packageId":package},
        {country:country,},
        {state:state,},
        {status:status,},
        {vehicleType:vehicleType}
      ]
    }).populate([
      {path:"country",select:"name"},
      {path:"state",select:"name"},
      {path:"vehicleType",select:"name"}
  ])

  let cityFare = await db.rentalFareCity.find({
    $or:[
      {"package.packageId":package},
      {country:country},
      {state:state},
      {city:city},
      {status:status},
      {vehicleType:vehicleType}
    ]
  }).populate([
    {path:"country",select:"name"},
    {path:"state",select:"name"},
    {path:"vehicleType",select:"name"},
    {path:"city",select:"name"},
])

let allFare = [...countryFare,...stateFare,...cityFare]


    res.status(200).json({
      success:true,
      allRentalFare:allFare
    })
  }
  
}