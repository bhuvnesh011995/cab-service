const db = require("../model/index");

exports.addPromoCode = async function (req, res, next) {
  let obj = { ...req.body };
  try {
    let promoCode = await db.promoCode.create(obj);
    if (Array.isArray(obj.selectUser) && obj.selectUser.length > 0) {
      obj.selectUser = obj.selectUser[0];
    }
    promoCode = await db.promoCode
      .findById(promoCode._id)
      .populate([
        { path: "country" },
        { path: "state" },
        { path: "city" },
        { path: "selectUser" },
        { path: "vehicleType" },
      ]);
    res.status(201).json(promoCode);
  } catch (error) {
    next(error);
  }
};

exports.getAllPromoCode = async function (req, res, next) {
  try {
    const promoCode = await db.promoCode
      .find({})
      .populate([
        { path: "country" },
        { path: "state" },
        { path: "city" },
        { path: "vehicleType" },
        { path: "selectUser" },
      ]);
    return res.status(200).json(promoCode);
  } catch (error) {
    next(error);
  }
};

exports.deletePromoCode = async function (req, res) {
  const id = req.params.id;

  try {
    const result = await db.promoCode.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      return res
        .status(200)
        .json({ message: "Delete successfully", success: true });
    } else {
      return res.status(400).json({ message: "promoCode not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePromoCode = async function (req, res) {
  console.log(req.body);
  try {
    const { id } = req.params;
    let obj = {};
    if (Array.isArray(obj.selectUser) && obj.selectUser.length > 0) {
      obj.selectUser = obj.selectUser[0];
    }
    if (req.body.country) obj.country = req.body.country;
    if (req.body.state) obj.state = req.body.state;
    if (req.body.city) obj.city = req.body.city;
    if (req.body.vehicleType) obj.vehicleType = req.body.vehicleType;
    if (req.body.forUser) obj.forUser = req.body.forUser;
    if (req.body.discountValue) obj.discountValue = req.body.discountValue;
    if (req.body.discountType) obj.discountType = req.body.discountType;
    if (req.body.promoCode) obj.promoCode = req.body.promoCode;
    if (req.body.validFrom) obj.validFrom = req.body.validFrom;
    if (req.body.validTo) obj.validTo = req.body.validTo;
    if (req.body.selectUser) obj.selectUser = req.body.selectUser;
    if (req.body.multipleUser) obj.multipleUser = req.body.multipleUser;

    let promoCode = await db.promoCode.findByIdAndUpdate(
      { _id: id },
      { $set: obj },
      { new: true }
    );
    promoCode = await db.promoCode
      .findById(promoCode._id)
      .populate([
        { path: "country" },
        { path: "state" },
        { path: "city" },
        { path: "vehicleType" },
        { path: "selectUser" },
      ]);
    res.status(200).json(promoCode);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal error occurred",
    });
  }
};

exports.filterPromoCode = async (req, res, next) => {
  try {
    let { promoCode, country, state, city, vehicleType, selectUser } =
      req.query;

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
          from: "VehicleType",
          localField: "vehicleType",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1 } }],
          as: "vehicleType",
        },
      },
      { $unwind: "$vehicleType" },

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
          from: " ",
        },
      },

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
    if (promoCode)
      matchStage.$match.$or = [
        { promoCode: { $regex: promoCode, $options: "i" } },
      ];
    if (country)
      matchStage.$match.$or.push({
        "country.name": { $regex: country, $options: "i" },
      });
    if (state)
      matchStage.$match.$or.push({
        "state.name": { $regex: state, $options: "i" },
      });
    if (city)
      matchStage.$match.$or.push({
        "city.name": { $regex: city, $options: "i" },
      });

    if (vehicleType)
      matchStage.$match.$or.push({
        "vehicleType.name": { $regex: vehicleType, $options: "i" },
      });

    if (matchStage.$match.$or && matchStage.$match.$or.length > 0) {
      query.push(matchStage);
    }

    query.push({
      $project: {
        promoCode: 1,
        country: 1,
        state: 1,
        city: 1,
        status: 1,
        description: 1,
        createdAt: 1,
        forUser: 1,
        discountValue: 1,
        discountType: 1,
        selectUser: 1,
        validFrom: 1,
        validTo: 1,
        multipleUser: 1,
        _id: 1,
        vehicleType: 1,
      },
    });

    let promoCodes = await db.promoCode.aggregate(query);
    console.log(promoCodes);
    res.status(200).json(promoCodes);
  } catch (error) {
    next(error);
  }
  a;
};
