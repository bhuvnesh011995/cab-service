const State = require("../model/state.model");
const Country = require("../model/country.model");
const db = require("../model/index");
const { default: mongoose } = require("mongoose");

exports.addState = async function (req, res, next) {
  try {
    let state = await State.create(req.body);

    state = await db.state.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(state._id) } },
      {
        $lookup: {
          from: "Country",
          localField: "country",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1 } }],
          as: "country",
        },
      },
      { $unwind: "$country" },
    ]);

    res.status(201).json(state[0]);
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

exports.filterStates = async (req, res, next) => {
  try {
    const { name, status, country } = req.query;
    let query = [];

    query.push(
      {
        $lookup: {
          from: "Country",
          localField: "country",
          foreignField: "_id",
          pipeline: [{ $project: { name: true } }],
          as: "country",
        },
      },
      { $unwind: "$country" }
    );
    query[2] = { $match: { $or: [] } };
    if (name)
      query[2].$match.$or.push({ name: { $regex: name, $options: "i" } });
    if (status)
      query[2].$match.$or.push({ status: { $regex: status, $options: "i" } });
    if (country)
      query[2].$match.$or.push({
        "country.name": { $regex: country, $options: "i" },
      });
    if (!query[2].$match.$or.length) query[2] = { $match: {} };
    let states = await db.state.aggregate([query]);

    res.status(200).json(states);
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

    for (i = 0; i < states.length; i++) {
      stateList.push({
        name: states[i].name,
        stateCode: states[i].stateCode,
        createdAt: states[i].createdAt,
        status: states[i].status,
        country: states[i].country
          ? { id: states[i].country._id, name: states[i].country.name }
          : null,
        _id: states[i]._id,
      });
    }

    res.status(200).json({
      success: true,
      stateList: stateList,
    });
  } catch (error) {
    console.log(error);
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

    let states = await db.state.aggregate([
      { $match: { country: new mongoose.Types.ObjectId(countryId) } },
      { $project: { name: 1 } },
    ]);

    res.status(200).json(states);
  } catch (error) {
    next(error);
  }
};

exports.deleteState = async function (req, res) {
  const id = req.params.id;
  try {
    const result = await db.state.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      return res.status(204).end();
    } else {
      return res.status(400).json({ message: "delete state not found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.updateState = async function (req, res, next) {
  try {
    await db.state.updateOne({ _id: req.params.id }, { $set: req.body });
    let state = await db.state.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "Country",
          localField: "country",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1 } }],
          as: "country",
        },
      },
      { $unwind: "$country" },
    ]);

    res.status(200).json(state[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
