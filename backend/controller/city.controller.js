const db = require("../model/index");

exports.addCity = async function (req, res, next) {
  try {
    const {
      name,
      state,
      country,
      status,
      vehicleService,
      utcOffset,
      territory,
    } = req.body;

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
      return;
    }
    let stateId = countryDoc.state[0]._id;

    const serviceArr = [];

    for (let i = 0; i < vehicleService.length; i++) {
      const vehicleTypeName = Object.keys(vehicleService[i]);
      const vehicleTypeDoc = await db.vehicleType.findOne({
        name: vehicleTypeName[0],
      });
      const vehicleTypeId = vehicleTypeDoc._id;
      const runModes = vehicleService[i][vehicleTypeName[0]];
      let runMode = [];
      for (j = 0; j < runModes.length; j++) {
        let runmode = await db.runMode.findOne({ name: runModes[j] });
        runMode.push(runmode._id);
      }
      serviceArr.push({
        vehicleType: vehicleTypeId,
        runMode: runMode,
      });
    }

    let territorieDoc = await db.territory.create({ area: territory });

    const city = await db.city.create({
      name: name,
      status: status,
      country: countryDoc._id,
      state: countryDoc.state[0]._id,
      utcOffset: utcOffset,
      territory: territorieDoc._id,
    });

    await db.state.updateOne(
      { _id: stateId },
      {
        $push: { city: city._id },
      }
    );

    serviceArr.forEach(async (ele) => {
      await db.city.updateOne(
        { _id: city._id },
        {
          $push: { cityService: ele },
        }
      );
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.getcityByName = async function (req, res, next) {
  try {
    const name = req.params.name;
    // const city = await db.city.findOne({name:name}).populate([{
    //     path:"cityService",
    //     populate:{
    //         path:"vehicleType",
    //         model:"vehicleType",
    //         select:"name"
    // },
    //     populate:{
    //         path:"runMode",
    //         model:"RunMode",
    //         select:"name"
    //     }
    // }]).lean()

    const city = await db.city
      .findOne({ name: name })
      .populate([
        {
          path: "cityService",
          populate: [
            {
              path: "vehicleType",
              model: "vehicleType",
              select: { name: 1, _id: 0 },
            },
            {
              path: "runMode",
              model: "RunMode",
              select: { name: 1, _id: 0 },
            },
          ],
        },
      ])
      .lean();
    return res.status(200).send(city);
  } catch (error) {
    next(error);
  }
};

exports.filterCity = async function (req, res, next) {
  try {
    const { text } = req.query;
    let cities = [];
    if (!text) {
      var city = await db.city
        .find({})
        .select({ name: 1, status: 1, createdAt: 1 })
        .populate([
          {
            path: "state",
            model: "State",
            select: { name: 1, _id: 0 },
          },
          {
            path: "country",
            model: "Country",
            select: { name: 1, _id: 0 },
          },
          {
            path: "territory",
            model: "Territory",
          },
        ]);
    } else {
      var country = await db.country.find({ name: text }).populate([
        {
          path: "state",
          model: "State",
          populate: {
            path: "city",
            model: "City",
            select: { name: 1, status: 1, createdAt: 1 },
            populate: [
              {
                path: "country",
                model: "Country",
                select: { name: 1, _id: 0 },
              },
              {
                path: "state",
                model: "State",
                select: { name: 1, _id: 0 },
              },
              {
                path: "territory",
                model: "Territory",
              },
            ],
          },
        },
      ]);

      var state = await db.state.find({ name: text }).populate([
        {
          path: "city",
          model: "City",
          select: { name: 1, status: 1, createdAt: 1 },
          populate: [
            {
              path: "country",
              model: "Country",
              select: { name: 1, _id: 0 },
            },
            {
              path: "state",
              model: "State",
              select: { name: 1, _id: 0 },
            },
            {
              path: "territory",
              model: "Territory",
            },
          ],
        },
      ]);

      city = await db.city
        .find({ name: text })
        .select({ name: 1, status: 1, createdAt: 1 })
        .populate([
          {
            path: "state",
            model: "State",
            select: { name: 1, _id: 0 },
          },
          {
            path: "country",
            model: "Country",
            select: { name: 1, _id: 0 },
          },
          {
            path: "territory",
            model: "Territory",
          },
        ]);
    }

    let set = new Set();
    if (country?.length) {
      for (i = 0; i < country.length; i++) {
        if (country[i].state.length) {
          for (j = 0; j < country[i].state.length; j++) {
            if (country[i].state[j].city.length) {
              for (k = 0; k < country[i].state[j].city.length; k++) {
                if (set.has(country[i].state[j].city[k]._id)) continue;
                let obj = {};
                obj.name = country[i].state[j].city[k].name;
                obj.status = country[i].state[j].city[k].status;
                obj.createdAt = country[i].state[j].city[k].createdAt;
                obj.country = country[i].state[j].city[k].country?.name;
                obj.state = country[i].state[j].city[k].state?.name;
                obj.territory = country[i].state[j].city[k].territory;
                cities.push(obj);
                set.add(country[i].state[j].city[k]._id);
              }
            }
          }
        }
      }
    }

    if (state?.length) {
      for (j = 0; j < state.length; j++) {
        if (state[j].city.length) {
          for (k = 0; k < state[j].city.length; k++) {
            if (set.has(state[j].city[k]._id)) continue;
            let obj = {};
            obj.name = state[j].city[k].name;
            obj.status = state[j].city[k].status;
            obj.createdAt = state[j].city[k].createdAt;
            obj.country = state[j].city[k].country?.name;
            obj.state = state[j].city[k].state?.name;
            obj.territory = state[j].city[k].territory;
            cities.push(obj);
            set.add(state[j].city[k]._id);
          }
        }
      }
    }
    if (city?.length) {
      for (k = 0; k < city.length; k++) {
        if (set.has(city[k]._id)) continue;
        let obj = {};
        obj.name = city[k].name;
        obj.status = city[k].status;
        obj.createdAt = city[k].createdAt;
        obj.country = city[k].country?.name;
        obj.state = city[k].state?.name;
        obj.territory = city[k].territory;
        cities.push(obj);
        set.add(city[k]._id);
      }
    }
    res.status(200).json({
      success: true,
      cities: cities,
    });
  } catch (error) {
    next(error);
  }
};

exports.getcityBystateAndCountry = async function (req, res, next) {
  try {
    const country = req.params.country;
    const state = req.params.state;

    let countryDoc = await db.country.findOne({ name: country }).populate([
      {
        path: "state",
        model: "State",
        match: { name: state },
        populate: {
          path: "city",
          model: "City",
          select: { name: 1, _id: 0 },
        },
      },
    ]);
    res.status(200).json({
      cities: countryDoc.state[0]?.city,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCityByStateId = async function (req, res, next) {
  try {
    const { stateId } = req.params;
    let cities = await db.city.find({ state: stateId }).select("name");

    res.status(200).json({
      success: true,
      cities,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateMapById = async function (req, res, next) {
  try {
    const { mapId } = req.params;

    const { area } = req.body;
    console.log(area);
    await db.territory.findByIdAndUpdate(
      { _id: mapId },
      {
        $set: { area },
      }
    );

    res.status(200).json({
      success: true,
      message: "map updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCity = async function (req,res){
  const id = req.params.id
  try{
    const result = await db.city.deleteOne({_id: id})
    if(result.deletedCount === 1){
      return res.status(200).json({message : "city delete successfully"});
    }
    else{
      return res.status(400).json({message:"city state not found"})
    }
  }
  catch(error){
    console.log(error)
    return res.status(5000).json({message:"Internal Server Error"})
  }
}