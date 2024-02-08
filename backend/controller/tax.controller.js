const db = require("../model/index");

exports.addTax = async function (req, res, next) {
  try {
    await db.tax.create(req.body);

    res.status(200).json({
      success: true,
      message: "tax added successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.filterTax = async function (req, res, next) {
  try {
    const { title, status } = req.query;

    if (!title && !status) {
      var taxes = await db.tax.find({});
    } else {
      taxes = await db.tax.find({
        $or: [{ title }, { status }],
      });
    }

    res.status(200).json({
      success: true,
      taxes,
    });
  } catch (error) {
    next(error);
  }
};

exports.filterTaxes = async (req, res, next) => {
  try {
    const { title, status } = req.query;
    let query = [{ $match: { $or: [] } }];
    if (title)
      query[0].$match.$or.push({ title: { $regex: title, $options: "i" } });
    if (status) query[0].$match.$or.push({ status });

    if (!status && !title) query[0].$match = {};

    let taxes = await db.tax.aggregate(query);

    res.status(200).json(taxes);
  } catch (error) {
    next(error);
  }
};
