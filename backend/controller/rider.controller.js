const db = require("../model/index");
const bcrypt = require("bcrypt");

exports.addRider = async function (req, res, next) {
  const {
    firstName,
    lastName,
    email,
    mobile,
    password,
    DOB,
    country,
    state,
    city,
    address,
    pincode,
    gender,
  } = req.body;

  let wallet = await db.wallet.create({})

  const countryDoc = await db.country
    .findOne({ name: country })
    .populate({ path: "state", match: { name: state },populate:{
            path:"city",
            model:"City",
            match:{name:city}
    } });

    if(!countryDoc.state[0].city[0]){
        res.status(400).josn({
            success:false,
            message:"no country or state or city found"
        }) 
        return;
    }

   const countryId = countryDoc._id
   const stateId = countryDoc.state[0]._id
   const cityId = countryDoc.state[0].city[0]._id

  let rider = await db.rider.create({
    wallet:wallet._id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobile: mobile,
    password: bcrypt.hashSync(password, 8),
    DOB: DOB,
    country:countryId,
    state:stateId,
    city:cityId,
    address:address,
    pincode:pincode,
    gender:gender
  });

  await db.wallet.updateOne({_id:wallet._id},{
    user:rider._id
  })

  res.status(200).json({
    success:true,
    message:"rider Created successful",
    rider:rider
  })

};

exports.getAllRider = async function(req,res,next){
    let riders = await db.rider.find({}).populate([
        "country","state","city","wallet"
    ])

    res.status(200).json({
        success:true,
        rider:riders
    })
}
