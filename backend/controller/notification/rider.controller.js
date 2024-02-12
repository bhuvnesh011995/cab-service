const { default: mongoose } = require("mongoose");
const db = require("../../model");
const { endOfDay, startOfDay } = require("date-fns");
exports.addRiderNotification = async (req, res, next) => {
  try {
    let notification = await db.riderNotification.create(req.body);

    let riderNotification = await db.riderNotification.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(notification._id) } },
      {
        $lookup: {
          from: "Rider",
          localField: "forUsers",
          foreignField: "_id",
          pipeline: [
            {
              $project: { name: { $concat: ["$firstName", " ", "$lastName"] } },
            },
          ],
          as: "forUsers",
        },
      },
    ]);

    res.status(201).json(riderNotification[0]);
  } catch (error) {
    next(error);
  }
};

exports.filterRiderNotification = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    let query = [{ $match: { $or: [] } }];
    if (from)
      query[0].$match.$or.push({
        createdAt: { $gte: startOfDay(new Date(from)) },
      });
    if (to)
      query[0].$match.$or.push({ createdAt: { $lte: endOfDay(new Date(to)) } });
    if (!from && !to) query[0].$match = {};
    query.push({
      $lookup: {
        from: "Rider",
        localField: "forUsers",
        foreignField: "_id",
        pipeline: [
          { $project: { name: { $concat: ["$firstName", " ", "$lastName"] } } },
        ],
        as: "forUsers",
      },
    });

    let notifications = await db.riderNotification.aggregate(query);
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

exports.updateRiderNotification = async (req, res, next) => {
  try {
    await db.riderNotification.updateOne(
      {
        _id: req.params.id,
      },
      { $set: req.body }
    );

    let notification = await db.riderNotification.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "Rider",
          localField: "forUsers",
          foreignField: "_id",
          pipeline: [
            {
              $project: { name: { $concat: ["$firstName", " ", "$lastName"] } },
            },
          ],
          as: "forUsers",
        },
      },
    ]);

    res.status(200).json(notification[0]);
  } catch (error) {
    next(error);
  }
};

exports.deleteRiderNotification = async (req, res, next) => {
  try {
    let result = await db.riderNotification.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 1) return res.status(204).end();
    else
      return res.status(400).json({ message: "no document found to delete" });
  } catch (error) {
    next(error);
  }
};
