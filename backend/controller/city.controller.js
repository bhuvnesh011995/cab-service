const db = require("../model/index");

exports.addCity = async function (req, res, next) {
  const { name, state, country, status,vehicalService} = req.body;

  const countryDoc = await db.country
    .findOne({
      name: country,
    })
    .populate({ path: "state", match: { name: state } });
  if (!countryDoc.state.length) {
    res.status(501).json({
      success: false,
      message: "no state found",
    });
  }

  const serviceArr =  [];
  
  for(let i = 0;i<vehicalService.length;i++){
        const vehicalTypeName = Object.keys(vehicalService[i])
        const vehicalTypeDoc = await db.vehicalType.findOne({name:vehicalTypeName[0]})
        const vehicalTypeId = vehicalTypeDoc._id
        const runModes = vehicalService[i][vehicalTypeName[0]]
        let runMode = []
        for(j=0;j<runModes.length;j++){
            let runmode = await db.runMode.findOne({name:runModes[j]})
            runMode.push(runmode._id)
        }
        serviceArr.push({
            vehicalType:vehicalTypeId,
            runMode:runMode
        })
  }

  const city = await db.city.create({
      name:name,
      status:status,
      country:countryDoc._id,
      state:countryDoc.state[0]._id
  })

    serviceArr.forEach(async (ele)=>{
        console.log(ele)
        await db.city.updateOne({_id:city._id},{
            $push:{cityService:ele}
        })
    })
  res.status(200).json({
    success: true,
  });

};

exports.getcityById = async function (req, res, next) {
    const name = req.params.name
    const city = await db.city.findOne({name:name}).populate([{
        path:"cityService",
        populate:{
            path:"vehicalType",
            model:"VehicalType",
            select:"name"
    },
        populate:{
            path:"runMode",
            model:"RunMode",
            select:"name"
        }
    }]).lean()
  return res.status(200).send(city);
};
