const db = require("../model/index");

exports.addRental = async (req, res) => {
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
      const response = await db.rentalFareCountry.findOneAndUpdate(
        { _id: body?._id },
        {
          $set: body,
        },
        { upsert: true, returnDocument: "after" },
      );
      const rentalFareData = await db.rentalFareCountry.aggregate([
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
          $lookup: {
            from: "RentalPackage",
            let: { packageId: "$package" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$packageId", "$_id"],
                  },
                },
              },
            ],
            as: "RentalPackageDetails",
          },
        },
        { $unwind: "$RentalPackageDetails" },
        {
          $project: {
            _id: 1,
            country: "$countryDetails.name",
            state: "$stateDetails.name",
            city: "$cityDetails.name",
            vehicleType: "$vehicleTypeDetails.name",
            package: "$RentalPackageDetails.name",
            status: 1,
            createdAt: 1,
          },
        },
      ]);
      return res.status(200).send(rentalFareData[0]);
    } else {
      const response = await db.rentalFareCountry.create(body);
      const rentalFareData = await db.rentalFareCountry.aggregate([
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
          $lookup: {
            from: "RentalPackage",
            let: { packageId: "$package" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$packageId", "$_id"],
                  },
                },
              },
            ],
            as: "RentalPackageDetails",
          },
        },
        { $unwind: "$RentalPackageDetails" },
        {
          $project: {
            _id: 1,
            country: "$countryDetails.name",
            state: "$stateDetails.name",
            city: "$cityDetails.name",
            vehicleType: "$vehicleTypeDetails.name",
            package: "$RentalPackageDetails.name",
            status: 1,
            createdAt: 1,
          },
        },
      ]);
      return res.status(200).send(rentalFareData[0]);
    }
  } catch (err) {
    console.error(err);
  }
};
exports.getAllRentals = async (req, res) => {
  try {
    const { country, state, city, vehicleType, status } = req.query;
    const rentalFareAggregateQuery = [];
    rentalFareAggregateQuery.push(
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
        $lookup: {
          from: "RentalPackage",
          let: { packageId: "$package" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$packageId", "$_id"],
                },
              },
            },
          ],
          as: "RentalPackageDetails",
        },
      },
      { $unwind: "$RentalPackageDetails" },
    );

    if (country?.length) {
      rentalFareAggregateQuery.push({
        $match: {
          $expr: {
            $eq: [{ $toString: "$countryDetails._id" }, country],
          },
        },
      });
    }

    if (state?.length) {
      rentalFareAggregateQuery.push({
        $match: {
          $expr: {
            $eq: [{ $toString: "$stateDetails._id" }, state],
          },
        },
      });
    }

    if (city?.length) {
      rentalFareAggregateQuery.push({
        $match: {
          $expr: {
            $eq: [{ $toString: "$cityDetails._id" }, city],
          },
        },
      });
    }

    if (vehicleType?.length) {
      rentalFareAggregateQuery.push({
        $match: {
          $expr: {
            $eq: [{ $toString: "$vehicleTypeDetails._id" }, vehicleType],
          },
        },
      });
    }

    if (status?.length) {
      rentalFareAggregateQuery.push({
        $match: {
          $expr: {
            $eq: ["$status", status],
          },
        },
      });
    }
    rentalFareAggregateQuery.push({
      $project: {
        _id: 1,
        country: "$countryDetails.name",
        state: "$stateDetails.name",
        city: "$cityDetails.name",
        vehicleType: "$vehicleTypeDetails.name",
        package: "$RentalPackageDetails.name",
        status: 1,
        createdAt: 1,
      },
    });

    const allRentalFares = await db.rentalFareCountry.aggregate(
      rentalFareAggregateQuery,
    );
    return res.status(200).send(allRentalFares);
  } catch (err) {
    console.error(err);
  }
};

exports.getSelectedRental = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.rentalFareCountry.aggregate([
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
exports.deleteRental = async (req, res) => {
  try {
    const response = await db.rentalFareCountry.deleteOne({
      _id: req.params.id,
    });
    return res.status(200).send({ message: "rentalFare deleted successfully" });
  } catch (err) {
    console.error(err);
  }
};
