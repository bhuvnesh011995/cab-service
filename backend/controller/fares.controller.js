const db = require("../model/index");

exports.addFare = async (req, res) => {
  try {
    const { body } = req;
    const allPerKMIds = [];
    if (body.perKmChargeData?.length) {
      for (let perKM of body.perKmChargeData) {
        if (perKM?._id) {
          const updatePerKM = await db.perKMCharge.findOneAndUpdate(
            { _id: perKM._id },
            {
              $set: perKM,
            },
            { upsert: true, returnDocument: "after" },
          );
          allPerKMIds.push(updatePerKM._id);
        } else if (!perKM?._id) {
          const addPerKM = await db.perKMCharge.create(perKM);
          allPerKMIds.push(addPerKM._id);
        }
      }
    }
    body.perKMCharge = allPerKMIds;
    if (body?._id) {
      const response = await db.indiFareCity.findOneAndUpdate(
        { _id: body?._id },
        {
          $set: body,
        },
        { upsert: true, returnDocument: "after" },
      );
      const fareData = await db.indiFareCity.aggregate([
        {
          $match: {
            $expr: {
              $eq: ["$_id", response._id],
            },
          },
        },
        {
          $lookup: {
            from: "Country",
            let: { countryId: "$country" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$countryId", "$_id"],
                  },
                },
              },
            ],
            as: "countryDetails",
          },
        },
        { $unwind: "$countryDetails" },
        {
          $lookup: {
            from: "City",
            let: { cityId: "$city" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$cityId", "$_id"],
                  },
                },
              },
            ],
            as: "cityDetails",
          },
        },
        { $unwind: "$cityDetails" },
        {
          $lookup: {
            from: "State",
            let: { stateId: "$state" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$stateId", "$_id"],
                  },
                },
              },
            ],
            as: "stateDetails",
          },
        },
        { $unwind: "$stateDetails" },
        {
          $lookup: {
            from: "VehicleType",
            let: { vehicleType: "$vehicleType" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$vehicleType", "$_id"],
                  },
                },
              },
            ],
            as: "vehicleTypeDetails",
          },
        },
        { $unwind: "$vehicleTypeDetails" },
        {
          $project: {
            _id: 1,
            country: "$countryDetails.name",
            state: "$stateDetails.name",
            city: "$cityDetails.name",
            vehicleType: "$vehicleTypeDetails.name",
            status: 1,
            createdAt: 1,
          },
        },
      ]);
      return res.status(200).send(fareData);
    } else {
      const response = await db.indiFareCity.create(body);
      const fareData = await db.indiFareCity.aggregate([
        {
          $match: {
            $expr: {
              $eq: ["$_id", response._id],
            },
          },
        },
        {
          $lookup: {
            from: "Country",
            let: { countryId: "$country" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$countryId", "$_id"],
                  },
                },
              },
            ],
            as: "countryDetails",
          },
        },
        { $unwind: "$countryDetails" },
        {
          $lookup: {
            from: "City",
            let: { cityId: "$city" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$cityId", "$_id"],
                  },
                },
              },
            ],
            as: "cityDetails",
          },
        },
        { $unwind: "$cityDetails" },
        {
          $lookup: {
            from: "State",
            let: { stateId: "$state" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$stateId", "$_id"],
                  },
                },
              },
            ],
            as: "stateDetails",
          },
        },
        { $unwind: "$stateDetails" },
        {
          $lookup: {
            from: "VehicleType",
            let: { vehicleType: "$vehicleType" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$vehicleType", "$_id"],
                  },
                },
              },
            ],
            as: "vehicleTypeDetails",
          },
        },
        { $unwind: "$vehicleTypeDetails" },
        {
          $project: {
            _id: 1,
            country: "$countryDetails.name",
            state: "$stateDetails.name",
            city: "$cityDetails.name",
            vehicleType: "$vehicleTypeDetails.name",
            status: 1,
            createdAt: 1,
          },
        },
      ]);
      console.log(fareData);
      return res.status(200).send(fareData);
    }
  } catch (err) {
    console.error(err);
  }
};
exports.getAllIndiFare = async (req, res) => {
  try {
    const fareAggregateQuery = [];

    fareAggregateQuery.push(
      {
        $lookup: {
          from: "Country",
          let: { countryId: "$country" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$countryId", "$_id"],
                },
              },
            },
          ],
          as: "countryDetails",
        },
      },
      { $unwind: "$countryDetails" },
      {
        $lookup: {
          from: "City",
          let: { cityId: "$city" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$cityId", "$_id"],
                },
              },
            },
          ],
          as: "cityDetails",
        },
      },
      { $unwind: "$cityDetails" },
      {
        $lookup: {
          from: "State",
          let: { stateId: "$state" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$stateId", "$_id"],
                },
              },
            },
          ],
          as: "stateDetails",
        },
      },
      { $unwind: "$stateDetails" },
      {
        $lookup: {
          from: "VehicleType",
          let: { vehicleType: "$vehicleType" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$vehicleType", "$_id"],
                },
              },
            },
          ],
          as: "vehicleTypeDetails",
        },
      },
      { $unwind: "$vehicleTypeDetails" },
      {
        $addFields: {
          coutryName: "$countryDetails.name",
          cityName: "$cityDetails.name",
          stateName: "$stateDetails.name",
          vehicleTypeName: "$vehicleTypeDetails.name",
        },
      },
    );

    if (req.query.country.length) {
      fareAggregateQuery.push({
        $match: {
          $expr: {
            $eq: ["$country", { $toObjectId: req.query.country }],
          },
        },
      });
    }
    if (req.query.state.length) {
      fareAggregateQuery.push({
        $match: {
          $expr: {
            $eq: ["$state", { $toObjectId: req.query.state }],
          },
        },
      });
    }
    if (req.query.city.length) {
      fareAggregateQuery.push({
        $match: {
          $expr: {
            $eq: ["$city", { $toObjectId: req.query.city }],
          },
        },
      });
    }
    if (req.query.vehicleType.length) {
      fareAggregateQuery.push({
        $match: {
          $expr: {
            $eq: ["$vehicleType", { $toObjectId: req.query.vehicleType }],
          },
        },
      });
    }
    if (req.query.status.length) {
      fareAggregateQuery.push({
        $match: {
          $expr: {
            $eq: ["$status", req.query.status],
          },
        },
      });
    }

    if (req.query.search.length) {
      fareAggregateQuery.push({
        $match: {
          $or: [
            {
              $expr: {
                $regexMatch: {
                  input: { $toLower: "$coutryName" },
                  regex: { $toLower: req.query.search },
                  options: "i",
                },
              },
            },
            {
              $expr: {
                $regexMatch: {
                  input: { $toLower: "$stateName" },
                  regex: { $toLower: req.query.search },
                  options: "i",
                },
              },
            },
            {
              $expr: {
                $regexMatch: {
                  input: { $toLower: "$cityName" },
                  regex: { $toLower: req.query.search },
                  options: "i",
                },
              },
            },
            {
              $expr: {
                $regexMatch: {
                  input: { $toLower: "$vehicleTypeName" },
                  regex: { $toLower: req.query.search },
                  options: "i",
                },
              },
            },
            {
              $expr: {
                $regexMatch: {
                  input: { $toLower: "$status" },
                  regex: { $toLower: req.query.search },
                  options: "i",
                },
              },
            },
          ],
        },
      });
    }

    fareAggregateQuery.push({
      $project: {
        _id: 1,
        country: "$countryDetails.name",
        state: "$stateDetails.name",
        city: "$cityDetails.name",
        vehicleType: "$vehicleTypeDetails.name",
        status: 1,
        createdAt: 1,
      },
    });

    const allFares = await db.indiFareCity.aggregate(fareAggregateQuery);
    return res.status(200).send(allFares);
    return res;
  } catch (err) {
    console.error(err);
  }
};

exports.getSelectedFare = async (req, res) => {
  try {
    const id = req.params.id;
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
exports.deleteIndividualFare = async (req, res) => {
  try {
    const response = await db.indiFareCity.deleteOne({ _id: req.params.id });
    return res.status(200).send({ message: "fare deleted successfully" });
  } catch (err) {
    console.error(err);
  }
};
