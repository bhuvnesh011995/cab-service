const db = require("../model/index");

exports.addRider = async (req, res, next) => {
  try {
    const body = JSON.parse(req.body.data);
    body["userImage"] = req.file.filename;
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
    const riderResponse = await db.rider.aggregate([
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
            {
              $expr: {
                $regexMatch: {
                  input: { $toLower: "$fullName" },
                  regex: { $toLower: req.query.search },
                  options: "i",
                },
              },
            },
          ],
        },
      },
    ]);
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
