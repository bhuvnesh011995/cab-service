const db = require("../model/index");

exports.addToll = async (req, res, next) => {
  try {
    if (req.body?._id) {
      const findToll = await db.location.findOne({ _id: req.body?._id });
      if (findToll) {
        const updateTollResponse = await db.location.findOneAndUpdate(
          { _id: req.body?._id },
          { $set: req.body },
          { upsert: true, returnDocument: "after" },
        );
        return res.status(200).send(updateTollResponse);
      } else {
        const addTollResponse = await db.location.create(req.body);
        return res.status(200).send(addTollResponse);
      }
    }
    const addTollResponse = await db.location.create(req.body);

    return res.status(200).send(addTollResponse);
  } catch (err) {
    next(err);
  }
};

exports.getAllTolls = async (req, res, next) => {
  try {
    const tollResponse = await db.location.aggregate([
      {
        $match: {
          $or: [
            {
              $expr: {
                $regexMatch: {
                  input: { $toLower: "$title" },
                  regex: { $toLower: req.query.search },
                  options: "i",
                },
              },
            },
            {
              $expr: {
                $regexMatch: {
                  input: { $toLower: "$amount" },
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
    ]);
    return res.status(200).send(tollResponse);
  } catch (err) {
    next(err);
  }
};

exports.getSelectedToll = async (req, res, next) => {
  try {
    const tollResponse = await db.location.findOne({ _id: req.params.id });
    return res.status(200).send(tollResponse);
  } catch (err) {
    next(err);
  }
};

exports.deleteToll = async (req, res, next) => {
  try {
    await db.location.deleteOne({ _id: req.params.id });
    return res.status(200).send({ message: "toll deleted successfully" });
  } catch (err) {
    next(err);
  }
};
