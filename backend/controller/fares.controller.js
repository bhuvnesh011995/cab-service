const db = require("../model/index");

exports.addFare = async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err);
  }
};
exports.getAllIndiFare = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
  }
};
exports.filterIndiFare = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
  }
};
exports.getSelectedFare = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.indiFareCity.aggregate([
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
exports.deleteIndividualFare = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
  }
};
