const db = require("../model/index");

exports.addPackage = async (req, res) => {
  try {
    if (req.body?._id) {
      const packageResponse = await db.rentalPackage.findOne({
        _id: req.body._id,
      });
      if (packageResponse) {
        const updatePackage = await db.rentalPackage.findOneAndUpdate(
          { _id: packageResponse._id },
          { $set: req.body },
          { upsert: true, returnDocument: "after" },
        );
        return res.status(200).send(updatePackage);
      } else {
        const addPackage = await db.rentalPackage.create(req.body);
        return res.status(200).send(addPackage);
      }
    }
    const packageResponse = await db.rentalPackage.create(req.body);
    return res.status(200).send(packageResponse);
  } catch (err) {
    console.error(err);
  }
};

exports.getAllPackages = async (req, res) => {
  try {
    const packageAggregateQuery = {};

    if (req.query.name?.length) {
      packageAggregateQuery["name"] = { $regex: req.query.name };
    }
    if (req.query.status?.length) {
      packageAggregateQuery["status"] = req.query.status;
    }

    const packageResponse = await db.rentalPackage.find(packageAggregateQuery);
    return res.status(200).send(packageResponse);
  } catch (err) {
    console.error(err);
  }
};

exports.deletePackage = async (req, res) => {
  try {
    await db.rentalPackage.deleteOne({ _id: req.params.id });
    return res.status(200).send("Package Deleted Successfully !");
  } catch (err) {
    console.error(err);
  }
};

exports.getSelectedPackage = async (req, res) => {
  try {
    const packageResponse = await db.rentalPackage.findOne({
      _id: req.params.id,
    });
    return res.status(200).send(packageResponse);
  } catch (err) {
    console.error(err);
  }
};
