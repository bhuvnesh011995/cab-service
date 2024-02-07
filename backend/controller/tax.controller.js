const db = require("../model/index");

exports.addTax = async function (req, res, next) {
  try {
    let tax = await db.tax.create(req.body);

    res.status(201).json(tax);
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

exports.updateTax = async (req, res, next) => {
  try {
    let tax = await db.tax.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(tax);
  } catch (error) {
    next(error);
  }
};

exports.deleteTax = async (req, res, next) => {
  try {
    let result = await db.tax.deleteOne({ _id: req.params.id });
    if (result.deletedCount !== 1)
      return res
        .status(400)
        .json({ message: "delete unsuccessfull , id not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
