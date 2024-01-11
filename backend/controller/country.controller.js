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

exports.deleteCountry = async function (req, res) {
  const id = req.params.id;
  try {
    const result = await Country.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "delete successfully" });
    } else {
      return res.status(400).json({ message: "country is not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCountry = async function (req, res, next) {
  try {
    const { id } = req.params;
    console.log("id", req.body);
    console.log(id);

    let obj = {};

    if (req.body.name) obj.name = req.body.name;
    if (req.body.status) obj.status = req.body.status;
    if (req.body.countryCode) obj.countryCode = req.body.countryCode;
    if (req.body.dialCode) obj.dialCode = req.body.dialCode;
    await Country.updateOne({ _id: id }, { $set: obj });

    res.status(200).json({ message: "update successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal error occurred",
    });
  }
};
