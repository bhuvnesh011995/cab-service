const Country = require("../model/country.model");
const db = require("../model");

exports.addCountry = async function (req, res, next) {
  try {
    const country = await Country.create(req.body);
    res.status(201).json(country);
  } catch (error) {
    next(error);
  }
};

exports.filterCountry = async function (req, res, next) {
  try {
    const { name, status } = req.query;
    let countries;
    if (!name && !status) {
      countries = await Country.find({})
        .select({
          name: 1,
          status: 1,
          countryCode: 1,
          dialCode: 1,
          createAt: 1,
        })
        .lean();
    } else {
      countries = await Country.find({
        $or: [{ name: name }, { status: status }],
      })
        .select({
          name: 1,
          status: 1,
          countryCode: 1,
          dialCode: 1,
          createAt: 1,
          _id: 0,
          createdAt: 1,
        })
        .lean();
    }

    res.status(200).json({
      success: true,
      countryList: countries,
    });
  } catch (error) {
    next(error);
  }
};

exports.getallCountry = async function (req, res, next) {
  try {
    const countries = await Country.aggregate([{ $project: { name: 1 } }]);
    res.status(200).json(countries);
  } catch (error) {
    next(error);
  }
};

exports.filterContries = async (req, res, next) => {
  try {
    const { name, status } = req.query;
    let query = [{ $match: { $or: [] } }];
    if (name)
      query[0].$match.$or.push({ name: { $regex: name, $options: "i" } });
    if (status) query[0].$match.$or.push({ status });

    if (!query[0].$match.$or.length) query[0].$match = {};
    let countries = await db.country.aggregate(query);
    res.status(200).json(countries);
  } catch (error) {
    next(error);
  }
};

exports.deleteCountry = async function (req, res) {
  const id = req.params.id;
  try {
    const result = await Country.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      return res.status(204).end();
    } else {
      return res.status(400).json({ message: "country is not found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateCountry = async function (req, res, next) {
  try {
    const country = await db.country.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(country);
  } catch (error) {
    console.log(error);

    next(error);
  }
};
