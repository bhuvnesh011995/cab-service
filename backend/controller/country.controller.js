const Country = require("../model/country.model");

exports.addCountry = async function (req, res, next) {
  try {
    const { name, countryCode, status, dialCode } = req.body;

    const country = await Country.create({
      name: name,
      countryCode: countryCode,
      status: status,
      dialCode: dialCode,
    });
    res
      .status(201)
      .json({
        success: true,
        message: "country added",
      })
      .end();
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
          _id: 0,
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
    const countries = await Country.find({}).select({ name: 1 }).lean();
    res.status(200).json(countries);
  } catch (error) {
    next(error);
  }
};
