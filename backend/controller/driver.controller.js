const db = require("../model/index");
const bcrypt = require("bcrypt");

exports.addDriver = async function (req, res, next) {
  try {
    const driverData = JSON.parse(req.body.data);
    for (let file of req.files) {
      if (file.fieldname == "panFile") {
        driverData.pan.file = file.filename;
      } else if (file.fieldname == "aadharFile") {
        driverData.aadhar.file = file.filename;
      } else if (file.fieldname == "licenseFile") {
        driverData.license.file = file.filename;
      } else if (file.fieldname == "driverFile") {
        driverData.driverFile = file.filename;
      }
    }
    if (driverData?._id) {
      const existDriverResponse = await db.driver.findOneAndUpdate(
        { _id: driverData._id },
        { $set: driverData },
        { upsert: true, returnDocument: "after" }
      );
      return res.status(200).send(existDriverResponse);
    }

    let admin = await db.admin.findOne({ username: "admin" });

    let wallet = await db.wallet.create({});

    driverData.wallet = wallet._id;
    driverData.password = bcrypt.hashSync(driverData.password, 8);
    driverData.createdBy = admin._id;
    driverData.updatedBy = admin._id;
    if (driverData.verified) {
      driverData.verifiedBy = admin._id;
    }
    if (driverData.pan.verified) {
      driverData.pan.verifiedBy = admin._id;
    }
    if (driverData.aadhar.verified) {
      driverData.aadhar.verifiedBy = admin._id;
    }
    if (driverData.license.verified) {
      driverData.license.verifiedBy = admin._id;
    }
    let driver = await db.driver.create(driverData);

    return res.status(200).send(driver);
  } catch (error) {
    next(error);
  }
};

exports.getAllDriver = async function (req, res, next) {
  try {
    const driverAggregateQuery = [];
    if (req.query.status.length)
      driverAggregateQuery.push({
        $match: {
          $expr: {
            $eq: ["$status", req.query.status],
          },
        },
      });
    driverAggregateQuery.push(
      {
        $addFields: {
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
        },
      },
      {
        $match: {
          $or: [
            {
              $expr: {
                $regexMatch: {
                  input: { $toLower: "$fullName" },
                  regex: { $toLower: req.query.search },
                  options: "i",
                },
              },
            },
            {
              $expr: {
                $regexMatch: {
                  input: { $toLower: "$email" },
                  regex: { $toLower: req.query.search },
                  options: "i",
                },
              },
            },
            {
              $expr: {
                $regexMatch: {
                  input: { $toLower: "$mobile" },
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
      }
    );
    let drivers = await db.driver.aggregate(driverAggregateQuery);

    res.status(200).json({
      success: true,
      drivers: drivers,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSelectedDriver = async function (req, res, next) {
  try {
    const driverResponse = await db.driver.findOne({ _id: req.params.id });
    console.log(driverResponse, req.params);
    return res.status(200).send(driverResponse);
  } catch (err) {
    next(err);
  }
};

exports.filterDriver = async function (req, res, next) {
  try {
    let { licExp, docPen, approved, name, email, mobile, status } = req.query;

    if (licExp === true || licExp === "true") {
      let drivers = await db.driver
        .find({ "license.expiryDate": { $lt: Date.now() } })
        .select({
          firstName: 1,
          lastName: 1,
          email: 1,
          mobile: 1,
          license: 1,
          aadhar: 1,
          pan: 1,
          status: 1,
          verified: 1,
          createdAt: 1,
        })
        .populate({ path: "wallet", select: { balance: 1, _id: 0 } })
        .lean();

      res.status(200).json({
        success: true,
        drivers: drivers,
      });
    } else if (docPen === true || docPen === "true") {
      let drivers = await db.driver
        .find({
          $or: [
            { "license.verified": false },
            { "pan.verified": false },
            { "aadhar.verified": false },
          ],
        })
        .select({
          firstName: 1,
          lastName: 1,
          email: 1,
          mobile: 1,
          license: 1,
          aadhar: 1,
          pan: 1,
          status: 1,
          verified: 1,
          createdAt: 1,
        })
        .populate({ path: "wallet", select: { balance: 1, _id: 0 } })
        .lean();

      res.status(200).json({
        success: true,
        drivers: drivers,
      });
    } else if (approved === false || approved === "false") {
      let drivers = await db.driver
        .find({
          verified: false,
        })
        .select({
          firstName: 1,
          lastName: 1,
          email: 1,
          mobile: 1,
          license: 1,
          aadhar: 1,
          pan: 1,
          status: 1,
          verified: 1,
          createdAt: 1,
        })
        .populate({ path: "wallet", select: { balance: 1, _id: 0 } })
        .lean();

      res.status(200).json({
        success: true,
        drivers: drivers,
      });
    } else if (approved === true || approved === "true") {
      let drivers = await db.driver
        .find({
          verified: true,
        })
        .select({
          firstName: 1,
          lastName: 1,
          email: 1,
          mobile: 1,
          license: 1,
          aadhar: 1,
          pan: 1,
          status: 1,
          verified: 1,
          createdAt: 1,
        })
        .populate({ path: "wallet", select: { balance: 1, _id: 0 } })
        .lean();

      res.status(200).json({
        success: true,
        drivers: drivers,
      });
    } else if (name || mobile || email || status) {
      let drivers = await db.driver
        .find({
          $or: [
            { firstName: name },
            { lastName: name },
            { email: email },
            { mobile: mobile },
            { status: status },
          ],
        })
        .select({
          firstName: 1,
          lastName: 1,
          email: 1,
          mobile: 1,
          license: 1,
          aadhar: 1,
          pan: 1,
          status: 1,
          verified: 1,
          createdAt: 1,
        })
        .populate({ path: "wallet", select: { balance: 1, _id: 0 } })
        .lean();

      res.status(200).json({
        success: true,
        drivers: drivers,
      });
    } else {
      let drivers = await db.driver
        .find({})
        .populate([
          {
            path: "wallet",
            select: { balance: 1, _id: 0 },
          },
          {
            path: "address.country",
            model: "Country",
            select: { name: 1 },
          },
          {
            path: "address.state",
            model: "State",
            select: { name: 1 },
          },
          {
            path: "address.city",
            model: "City",
            select: { name: 1 },
          },
          {
            path: "createdBy",
            model: "Admin",
            select: { name: 1 },
          },
          {
            path: "updatedBy",
            model: "Admin",
            select: { name: 1 },
          },
        ])
        .lean();

      res.status(200).json({
        success: true,
        drivers: drivers,
      });
    }
    return;
  } catch (error) {
    next(error);
  }
};

exports.updateDriver = async function (req, res, next) {
  try {
    let id = req.params.driverId;
    let {
      firstName,
      lastName,
      email,
      mobile,
      license,
      aadhar,
      pan,
      status,
      verified,
    } = req.body;

    let admin = await db.admin.findOne({ username: "admin" });

    // const countryDoc = await db.country.findOne({ name: country }).populate({
    //   path: "state",
    //   model: "State",
    //   match: { name: state },
    //   populate: {
    //     path: "city",
    //     model: "City",
    //     match: { name: city },
    //   },
    // });

    // if (!countryDoc.state[0].city[0]) {
    //   res.status(400).josn({
    //     success: false,
    //     message: "no country or state or city found",
    //   });
    //   return;
    // }

    // const countryId = countryDoc._id;
    // const stateId = countryDoc.state[0]._id;
    // const cityId = countryDoc.state[0].city[0]._id;

    let driver = await db.driver.updateOne(
      { _id: id },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        "license.number": license?.number,
        "license.expiryDate": license?.expiryDate,
        "license.verified": license?.verified,
        "license.verifiedBy": admin._id,
        "aadhar.number": aadhar?.number,
        "aadhar.verified": aadhar?.verified,
        "aadhar.verifiedBy": admin._id,
        "pan.number": pan?.number,
        "pan.verified": pan?.verified,
        "pan.verifiedBy": admin._id,
        verified: verified,
        status: status,
        updatedBy: admin._id,
      }
    );

    res.status(200).json({
      success: true,
      message: "driver created successfully",
      driver: driver,
    });
  } catch (error) {
    next(error);
  }
};

exports.getActiveDriver = async function (req, res, next) {
  try {
    let drivers = await db.driver
      .find({
        "license.verified": true,
        "license.expiryDate": { $gt: Date.now() },
        "aadhar.verified": true,
        "pan.verified": true,
        verified: true,
        status: "ACTIVE",
      })
      .select({ firstName: 1, lastName: 1, email: 1, mobile: 1 });

    res.status(200).json({
      success: true,
      drivers,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllDrivers = async (req, res, next) => {
  try {
    let drivers = await db.driver.aggregate([
      {
        $project: {
          name: { $concat: ["$firstName", " ", "$lastName"] },
        },
      },
    ]);

    res.status(200).json(drivers);
  } catch (error) {
    next(error);
  }
};
