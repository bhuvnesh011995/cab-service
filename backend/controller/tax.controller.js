const db = require("../model/index");

exports.addTax = async function (req, res, next) {
  try {
    const { title, value, status, taxType } = req.body;

    await db.tax.create({
      title,
      value,
      status,
      taxType,
    });

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
