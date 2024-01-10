const State = require("../model/state.model");
const Country = require("../model/country.model");
const db = require("../model/index");

exports.addState = async function (req, res, next) {
  try {
    const { name, country, status, stateCode } = req.body;

    const countryDoc = await Country.findOne({ name: country });

    const state = await State.create({
      name: name,
      status: status,
      stateCode: stateCode,
      country: countryDoc._id,
    });

    await Country.updateOne(
      { name: country },
      {
        $push: { state: state._id },
      }
    );

    res
      .status(202)
      .json({
        success: true,
        message: "state added",
      })
      .end();
  } catch (error) {
    next(error);
  }
};

exports.getallStateByCountry = async function (req, res, next) {
  try {
    const { country } = req.query;

    let states = await Country.findOne({ name: country }).populate({
      path: "state",
      select: { name: 1 },
    });

    res.status(200).json(states?.state || []);
  } catch (error) {
    next(error);
  }
};

exports.filterState = async function (req, res, next) {
  let { country, name, status } = req.query;

  try {
    let states;
    if (!country && !name && !status) {
      states = await State.find({})
        .select({
          name: 1,
          country: 1,
           
          stateCode: 1,
          createdAt: 1,
          status: 1,
        })
        .populate({ path: "country", select: { name: 1 } })
        .lean();
    } else {
      if (country) {
        const countryDoc = await Country.findOne({ name: country });
        country = countryDoc._id;
      } else country = null;

      states = await State.find({
        $or: [{ name: name }, { country: country }, { status: status }],
      })
        .select({
          name: 1,
          country: 1,

          stateCode: 1,
          createdAt: 1,
          status: 1,
        })
        .populate({ path: "country", select: { name: 1 } })
        .lean();
    }

    let stateList = [];
    let count = 0;
    console.log(states)
    for (i = 0; i < states.length; i++) {
      stateList.push({
        name: states[i].name,
        stateCode: states[i].stateCode,
        createdAt: states[i].createdAt,
        status: states[i].status,
        country: states[i].country ? { id: states[i].country._id, name: states[i].country.name } : null,
        _id: states[i]._id,
      });
     
    }

    res.status(200).json({
      success: true,
      stateList: stateList,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: "error occoured",
      error,
    });
  }
};

exports.getallStateByCountryId = async function (req, res, next) {
  try {
    const { countryId } = req.params;

    let states = await db.state.find({ country: countryId }).select("name");

    res.status(200).json({
      success: true,
      states,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteState = async function (req,res){
  const id = req.params.id
  try{
    const result = await db.state.deleteOne({_id: id})
    if(result.deletedCount === 1){
      return res.status(200).json({message : "state delete successfully"});
    }
    else{
      return res.status(400).json({message:"delete state not found"})
    }
  }
  catch(error){
    console.log(error)
    return res.status(5000).json({message:"Internal Server Error"})
  }
}

exports.updateState = async function (req, res, next) {
  try {
      const { id } = req.params;
      console.log("id", req.body);
      console.log(id)


      let obj = {};
    
      if(req.body.name) obj.name = req.body.name
      if(req.body.status) obj.status = req.body.status
      if(req.body.countryCode) obj.countryCode = req.body.countryCode
      if(req.body.dialCode) obj.dialCode = req.body.dialCode
      await db.state.updateOne({ _id:id}, { $set: obj});
    
      res.status(200).json({message:"update successfully"})

  } catch (error) {
      console.log(error);

      res.status(500).json({
          success: false,
          message: "Internal error occurred",
      });
  }
};