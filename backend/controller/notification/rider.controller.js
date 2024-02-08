const db = require("../../model");
exports.addRiderNotification = async (req, resnext) => {
  try {
    let notification = await db.riderNotification.create(req.body);

    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

exports.filterRiderNotification = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    let query = [{ $match: { $or: [] } }];
  } catch (error) {}
};
