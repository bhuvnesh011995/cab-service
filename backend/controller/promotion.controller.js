const db = require("../model/index");

exports.addPromotion = async function (req, res, next) {
  let obj = { ...req.body };
  try {
    let promotion = await db.promotion.create(obj);
    promotion = await db.promotion
      .findById(promotion._id)
      .populate([{ path: "country" }, { path: "state" }, { path: "city" }]);
    res.status(201).json(promotion);
  } catch (error) {
    next(error);
  }
};

exports.getAllPromotion = async function (req, res, next) {
  try {
    const promotion = await db.promotion
      .find({})
      .populate([{ path: "country" }, { path: "state" }, { path: "city" }]);
    return res.status(200).json(promotion);
  } catch (error) {
    next(error);
  }
};

exports.filterPromotion = async function (req, res, next) {
  try {
    const { title, countryId, stateId, cityId, status, forUsers } = req.query;

    if (!title && !countryId && !stateId && !cityId && !status && !forUsers) {
      var promotions = await db.promotion
        .find({})
        .populate({ path: "state country city", select: "name" });
    } else {
      var promotions = await db.promotion
        .find({
          $or: [
            { title },
            { country: countryId },
            { state: stateId },
            { city: cityId },
            { status },
            { forUsers },
          ],
        })
        .populate({ path: "state country city", select: "name" });
    }

    res.status(200).json({
      success: true,
      promotions,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePromotion = async function (req, res) {
  const id = req.params.id;

  try {
    const result = await db.promotion.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      return res
        .status(200)
        .json({ message: "Delete successfully", success: true });
    } else {
      return res.status(400).json({ message: "Promotion not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePromotion = async function (req, res) {
  try {
    const { id } = req.params;
    let obj = {};
    if (req.body.name) obj.name = req.body.name;
    if (req.body.country) obj.country = req.body.country;
    if (req.body.state) obj.state = req.body.state;
    if (req.body.city) obj.city = req.body.city;
    if (req.body.description) obj.description = req.body.description;
    if (req.body.forUsers) obj.forUsers = req.body.forUsers;
    if (req.body.status) obj.status = req.body.status;
    let promotion = await db.promotion.findByIdAndUpdate(
      { _id: id },
      { $set: obj },
      { new: true }
    );
    promotion = await db.promotion
      .findById(promotion._id)
      .populate([{ path: "country" }, { path: "state" }, { path: "city" }]);
    res.status(200).json(promotion);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal error occurred",
    });
  }
};

exports.filterPromotion = async (req, res, next) => {
  try {
    let { name, country, state, city } = req.query;
    let query = [
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
      {
        $lookup: {
          from: "State",
          localField: "state",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1 } }],
          as: "state",
        },
      },
      { $unwind: "$state" },
      {
        $lookup: {
          from: "City",
          localField: "city",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1 } }],
          as: "city",
        },
      },
      { $unwind: "$city" },
    ];

    let matchStage = { $match: { $or: [] } };
    if (name)
      matchStage.$match.$or = [{ name: { $regex: name, $options: "i" } }];
    if (country)
      matchStage.$match.$or.push({
        "country.name": { $regex: country, $options: "i" },
      });
    if (state) {
      matchStage.$match.$or.push({
        "state.name": { $regex: state, $options: "i" },
      });
      console.log(state);
    }
    if (city)
      matchStage.$match.$or.push({
        "city.name": { $regex: city, $options: "i" },
      });
    if (matchStage.$match.$or && matchStage.$match.$or.length > 0) {
      query.push(matchStage);
    }

    query.push({
      $project: {
        name: 1,
        country: 1,
        state: 1,
        city: 1,
        status: 1,
        description: 1,
        createAt: 1,
        forUsers: 1,
      },
    });

    let promotion = await db.promotion.aggregate(query);
    res.status(200).json(promotion);
  } catch (error) {
    next(error);
  }
};
