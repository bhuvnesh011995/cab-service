const {
  default: areIntervalsOverlapping,
} = require("date-fns/fp/areIntervalsOverlapping");
const db = require("../model/index");

exports.addFare = async function (req, res, next) {
  try {
    let {
      country,
      state,
      city,
      baseFare,
      minCharge,
      perMinCharge,
      cancelCharge,
      bookingFee,
      adminCommissionType,
      adminCommission,
      vehicleType,
      perKMCharge,
      status,
    } = req.body;
    let vehicleTypeDoc = await db.vehicleType.findOne({ name: vehicleType });

    if (!status.length) status = undefined;
    if (!state) {
      var countryDoc = await db.country.findOne({ name: country });

      var fare = await db.indiFareCountry.create({
        country: countryDoc._id,
        vehicleType: vehicleTypeDoc._id,
        baseFare: baseFare,
        minCharge: minCharge,
        perMinCharge: perMinCharge,
        cancelCharge: cancelCharge,
        bookingFee: bookingFee,
        adminCommissionType: adminCommissionType,
        adminCommission: adminCommission,
        status: status,
      });

      const allExtraCharge = await getId(perKMCharge);

      allExtraCharge.forEach(async (ele) => {
        await db.indiFareCountry.updateOne(
          { _id: fare._id },
          { $push: { perKMCharge: ele } },
        );
      });

      fare = await db.indiFareCountry.findOne({ _id: fare._id });
    } else if (!city) {
      countryDoc = await db.country
        .findOne({ name: country })
        .populate({ path: "state", match: { name: state } });
      if (!countryDoc.state.length) {
        res.status(501).json({
          success: false,
          message: "no state found",
        });
        return;
      }
      let stateId = countryDoc.state[0]._id;

      fare = await db.indiFareState.create({
        country: countryDoc._id,
        vehicleType: vehicleTypeDoc._id,
        state: stateId,
        baseFare: baseFare,
        minCharge: minCharge,
        perMinCharge: perMinCharge,
        cancelCharge: cancelCharge,
        bookingFee: bookingFee,
        adminCommissionType: adminCommissionType,
        adminCommission: adminCommission,
        status: status,
      });

      const allExtraCharge = await getId(perKMCharge);

      allExtraCharge.forEach(async (ele) => {
        await db.indiFareState.updateOne(
          { _id: fare._id },
          { $push: { perKMCharge: ele } },
        );
      });

      fare = await db.indiFareState.findOne({ _id: fare._id });
    } else {
      countryDoc = await db.country.findOne({ name: country }).populate({
        path: "state",
        match: { name: state },
        populate: {
          path: "city",
          model: "City",
          match: { name: city },
        },
      });
      if (!countryDoc.state.length) {
        res.status(501).json({
          success: false,
          message: "no state found",
        });
        return;
      }
      if (!countryDoc.state[0].city.length) {
        res.status(501).json({
          success: false,
          message: "no city found",
        });
        return;
      }

      const stateId = countryDoc.state[0]._id;
      const cityId = countryDoc.state[0].city[0]._id;

      fare = await db.indiFareCity.create({
        country: countryDoc._id,
        vehicleType: vehicleTypeDoc._id,
        state: stateId,
        city: cityId,
        baseFare: baseFare,
        minCharge: minCharge,
        perMinCharge: perMinCharge,
        cancelCharge: cancelCharge,
        bookingFee: bookingFee,
        adminCommissionType: adminCommissionType,
        adminCommission: adminCommission,
        status: status,
      });

      const allExtraCharge = await getId(perKMCharge);

      allExtraCharge.forEach(async (ele) => {
        await db.indiFareCity.updateOne(
          { _id: fare._id },
          { $push: { perKMCharge: ele } },
        );
      });

      fare = await db.indiFareCity.findOne({ _id: fare._id });
    }

    async function getId(obj) {
      let arr = await Promise.all(
        obj.map(async (ele) => {
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
          return perkmcharge._id;
        }),
      );

      return arr;
    }

    res.status(200).json({
      success: true,
      message: "fare added",
      data: fare,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllIndiFare = async function (req, res, next) {
  try {
    let countryFare = await db.indiFareCountry.find({}).populate([
      { path: "country", select: "name" },
      { path: "vehicleType", select: "name" },
    ]);

    let stateFare = await db.indiFareState.find({}).populate([
      { path: "country", select: "name" },
      { path: "state", select: "name" },
      { path: "vehicleType", select: "name" },
    ]);

    let cityFare = await db.indiFareCity.find({}).populate([
      { path: "country", select: "name" },
      { path: "state", select: "name" },
      { path: "vehicleType", select: "name" },
      { path: "city", select: "name" },
    ]);

    let allFare = [...countryFare, ...stateFare, ...cityFare];

    res.status(200).json({
      success: true,
      data: allFare,
    });
  } catch (error) {
    next(error);
  }
};

exports.filterIndiFare = async function (req, res, next) {
  try {
    let { country, state, city, vehicleType, status } = req.query;

    if (!country && !state && !city && !vehicleType && !status) {
      let countryFare = await db.indiFareCountry.find({}).populate([
        { path: "country", select: "name" },
        { path: "vehicleType", select: "name" },
      ]);

      let stateFare = await db.indiFareState.find({}).populate([
        { path: "country", select: "name" },
        { path: "state", select: "name" },
        { path: "vehicleType", select: "name" },
      ]);

      let cityFare = await db.indiFareCity.find({}).populate([
        { path: "country", select: "name" },
        { path: "state", select: "name" },
        { path: "vehicleType", select: "name" },
        { path: "city", select: "name" },
      ]);

      let allFare = [...countryFare, ...stateFare, ...cityFare];

      res.status(200).json({
        success: true,
        allIndiFare: allFare,
      });
      return;
    } else {
      if (vehicleType?.length) {
        var vehicleTypeDoc = await db.vehicleType.findOne({
          name: vehicleType,
        });
        vehicleType = vehicleTypeDoc?._id;
      } else vehicleType = null;

      if (country?.length) {
        let countryDoc = await db.country.findOne({ name: country });
        country = countryDoc._id;
      } else country = null;
      if (state?.length) {
        let stateDoc = await db.state.findOne({
          name: state,
        });
        state = stateDoc._id;
      } else state = null;

      if (city?.length) {
        let cityDoc = await db.city.findOne({ name: city });
        city = cityDoc._id;
      } else city = null;

      let countryFare = await db.indiFareCountry
        .find({
          $or: [
            { country: country },
            { status: status },
            { vehicleType: vehicleType },
          ],
        })
        .populate([
          { path: "country", select: "name" },
          { path: "vehicleType", select: "name" },
        ]);

      let stateFare = await db.indiFareState
        .find({
          $or: [
            { country: country },
            { state: state },
            { status: status },
            { vehicleType: vehicleType },
          ],
        })
        .populate([
          { path: "country", select: "name" },
          { path: "state", select: "name" },
          { path: "vehicleType", select: "name" },
        ]);

      let cityFare = await db.indiFareCity
        .find({
          $or: [
            { country: country },
            { state: state },
            { city: city },
            { status: status },
            { vehicleType: vehicleType },
          ],
        })
        .populate([
          { path: "country", select: "name" },
          { path: "state", select: "name" },
          { path: "vehicleType", select: "name" },
          { path: "city", select: "name" },
        ]);

      let allFare = [...countryFare, ...stateFare, ...cityFare];

      res.status(200).json({
        success: true,
        allIndiFare: allFare,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteIndividualFare = async function (req, res) {
  const id = req.params.id;
  console.log(id);

  try {
    const result = await db.indiFareCity.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      return res
        .status(200)
        .json({ message: "Delete successfully", success: true });
    } else {
      return res.status(400).json({ message: "Model not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSelectedFare = async function (req, res) {
  const id = req.params.id;
  try {
    const result = await db.indiFareCity.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $toString: "$_id" }, id],
          },
        },
      },
      {
        $lookup: {
          from: "PerKMCharge",
          let: { fieldArrayData: "$perKMCharge" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$fieldArrayData"],
                },
              },
            },
          ],
          as: "perKmChargeData",
        },
      },
    ]);
    return res.status(200).send(result[0]);
  } catch (err) {
    console.error(err);
  }
};
