const db = require("../model/index");

exports.addRider = async (req, res, next) => {
  try {
    const body = JSON.parse(req.body.data);
    body["profilePhoto"] = req.file.filename;
    if (body?._id) {
      const findRider = await db.rider.findOne({ _id: body?._id });
      if (findRider) {
        const updateRiderResponse = await db.rider.findOneAndUpdate(
          { _id: body?._id },
          { $set: body },
          { upsert: true, returnDocument: "after" },
        );
        return res.status(200).send(updateRiderResponse);
      } else {
        const addRiderResponse = await db.rider.create(body);
        return res.status(200).send(addRiderResponse);
      }
    }
    const addRiderResponse = await db.rider.create(body);

    return res.status(200).send(addRiderResponse);
  } catch (err) {
    next(err);
  }
};

exports.getAllRiders = async (req, res, next) => {
  try {
    const riderQuery = {};
    if (req.query.name.length) {
      riderQuery["name"] = { $regex: req.query.name };
    }
    if (req.query.email.length) {
      riderQuery["email"] = { $regex: req.query.email };
    }
    if (req.query.mobile.length) {
      riderQuery["mobile"] = { $regex: req.query.mobile };
    }
    if (req.query.status.length) {
      riderQuery["status"] = req.query.status;
    }
    const riderResponse = await db.rider.find(riderQuery);
    return res.status(200).send(riderResponse);
  } catch (err) {
    next(err);
  }
};

exports.getSelectedRider = async (req, res, next) => {
  try {
    const riderResponse = await db.rider.findOne({ _id: req.params.id });
    return res.status(200).send(riderResponse);
  } catch (err) {
    next(err);
  }
};

exports.deleteRider = async (req, res, next) => {
  try {
    await db.rider.deleteOne({ _id: req.params.id });
    return res.status(200).send({ message: "rider deleted successfully" });
  } catch (err) {
    next(err);
  }
};
