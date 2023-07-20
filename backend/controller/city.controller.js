const db = require("../model/index");

exports.addCity = async function (req, res, next) {
  const { name, state, country, status,vehicalService,utcOffset} = req.body;

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
  let stateId = countryDoc.state[0]._id
  console.log(countryDoc.state)

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
      state:countryDoc.state[0]._id,
      utcOffset:utcOffset
  })

  console.log(stateId)

    await db.state.updateOne({_id:stateId},{
      $push:{city:city._id}
    })

    serviceArr.forEach(async (ele)=>{
        await db.city.updateOne({_id:city._id},{
            $push:{cityService:ele}
        })
    })
  res.status(200).json({
    success: true,
  });

};

exports.getcityByName = async function (req, res, next) {
    const name = req.params.name
    // const city = await db.city.findOne({name:name}).populate([{
    //     path:"cityService",
    //     populate:{
    //         path:"vehicalType",
    //         model:"VehicalType",
    //         select:"name"
    // },
    //     populate:{
    //         path:"runMode",
    //         model:"RunMode",
    //         select:"name"
    //     }
    // }]).lean()

    const city = await db.city.findOne({name:name}).populate([{
      path:"cityService",
      populate:[{
      path:"vehicalType",
      model:"VehicalType",
      select:{name:1,_id:0}
    },
    {
      path:"runMode",
      model:"RunMode",
      select:{name:1,_id:0}
    }
  ]}]).lean()
  return res.status(200).send(city);
};




exports.filterCity= async function(req,res,next){
    const {text} = req.query
    let cities = []
    if(!text){
      cities = await db.city.find({}).select({name:1,_id:0,status:1,createdAt:1}).populate([{
        path:"state",
        model:"State",
        select:{name:1,_id:0}
      },
    {
      path:"country",
      model:"Country",
      select:{name:1,_id:0}
    }])
    }else{
      var country = await db.country.find({name:text}).populate([{
        path:"state",
        model:"State",
        populate:{
          path:"city",
          model:"City",
          select:{name:1,_id:0,status:1,createdAt:1},
          populate:[
            {
              path:"country",
              model:"Country",
              select:{name:1,_id:0}
          },{
            path:"state",
            model:"State",
            select:{name:1,_id:0}
          }
        ]
        }
      }
    ])
      var state = await db.state.find({name:text}).populate([{
        path:"city",
        model:"City",
        select:{name:1,_id:0,status:1,createdAt:1},
        populate:[
          {
            path:"country",
            model:"Country",
            select:{name:1,_id:0}
        },{
          path:"state",
          model:"State",
          select:{name:1,_id:0}
        }
      ]
      }])

    var city = await db.city.find({name:text}).select({name:1,_id:0,status:1,createdAt:1}).populate([{
      path:"state",
      model:"State",
      select:{name:1,_id:0}
    },
  {
    path:"country",
    model:"Country",
    select:{name:1,_id:0}
  }])
    }

    res.status(200).json({
      success:true,
      country:country,
      state:state,
      city:city
    })
  
  }
