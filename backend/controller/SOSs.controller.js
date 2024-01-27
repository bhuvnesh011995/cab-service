const db = require("../model/index");

exports.addSOS = async (req, res, next) => {
  try {
    const { body } = req;
    if (body?._id) {
      const getSOS = await db.sos.findOne({
        _id: body?._id,
      });
      if (getSOS) {
        const updateSOS = await db.sos.findOneAndUpdate(
          { _id: body?._id },
          { $set: body },
          { upsert: true, returnDocument: "after" },
        );
        return res.status(200).send(updateSOS);
      }
    }
    const sosResponse = await db.sos.create(body);
    return res.status(200).send(sosResponse);
  } catch (err) {
    next(err);
  }
};

exports.fetchAllSOSs = async (req, res, next) => {
  try {
    const { query } = req;
    const fetchSOSQuery = {};

    const sosResponse = await db.sos.find(fetchSOSQuery);
    return res.status(200).send(sosResponse);
  } catch (err) {
    next(err);
  }
};

exports.getSelectedSOS = async (req, res, next) => {
  try {
    const sosResponse = await db.sos.findOne({
      _id: req.params.id,
    });
    return res.status(200).send(sosResponse);
  } catch (err) {
    next(err);
  }
};

exports.deleteSOS = async (req, res, next) => {
  try {
    const deleteSOS = await db.sos.deleteOne({
      _id: req.params.id,
    });
    return res.status(200).send({ message: "SOS Deleted Successfully" });
  } catch (err) {
    next(err);
  }
};
