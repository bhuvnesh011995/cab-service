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
          _id: 0,
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
          _id: 0,
          stateCode: 1,
          createdAt: 1,
          status: 1,
        })
        .populate({ path: "country", select: { name: 1 } })
        .lean();
    }

    let stateList = [];
    let count = 0;
    for (i = 0; i < states.length; i++) {
      stateList.push({
        name: states[i].name,
        stateCode: states[i].stateCode,
        createdAt: states[i].createdAt,
        status: states[i].status,
      });
      if (states[i].country.name) {
        while (count <= i) {
          stateList[count].country = states[i].country.name;
          count++;
        }
      }
    }

    res.status(200).json({
      success: true,
      stateList: stateList,
    });
  } catch (error) {
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
