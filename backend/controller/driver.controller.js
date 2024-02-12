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
        { upsert: true, returnDocument: "after" },
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
    if (req.query.licExp == true || req.query.licExp == "true") {
      driverAggregateQuery.push({
        $match: {
          "license.expiryDate": { $lt: new Date() },
        },
      });
    }
    if (req.query.docPen == true || req.query.docPen == "true") {
      driverAggregateQuery.push({
        $match: {
          $or: [
            {
              $expr: {
                $eq: ["$license.verified", false],
              },
            },
            {
              $expr: {
                $eq: ["$aadhar.verified", false],
              },
            },
            {
              $expr: {
                $eq: ["$pan.verified", false],
              },
            },
          ],
        },
      });
    }
    if (req.query.approved == true || req.query.approved == "true") {
      driverAggregateQuery.push({
        $match: {
          $expr: { $eq: ["$verified", true] },
        },
      });
    }
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
      },
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
    return res.status(200).send(driverResponse);
  } catch (err) {
    next(err);
  }
};

exports.deleteDriver = async function (req, res, next) {
  try {
    const driverResponse = await db.driver.deleteOne({ _id: req.params.id });
    return res.status(200).send({ message: "driver deleted successfully " });
  } catch (err) {
    next(err);
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
