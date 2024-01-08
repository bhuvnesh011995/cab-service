const db = require("../model/index");
const bcrypt = require("bcrypt");

exports.addRider = async function (req, res, next) {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      password,
      DOB,
      country,
      state,
      city,
      place,
      pincode,
      gender,
      status,
      verified,
    } = req.body;

    let wallet = await db.wallet.create({});

    const countryDoc = await db.country.findOne({ name: country }).populate({
      path: "state",
      match: { name: state },
      populate: {
        path: "city",
        model: "City",
        match: { name: city },
      },
    });

    if (!countryDoc.state[0].city[0]) {
      res.status(400).josn({
        success: false,
        message: "no country or state or city found",
      });
      return;
    }

    const countryId = countryDoc._id;
    const stateId = countryDoc.state[0]._id;
    const cityId = countryDoc.state[0].city[0]._id;

    let rider = await db.rider.create({
      wallet: wallet._id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobile: mobile,
      password: bcrypt.hashSync(password, 8),
      DOB: DOB,
      "address.country": countryId,
      "address.state": stateId,
      "address.city": cityId,
      "address.place": place,
      "address.pincode": pincode,
      gender: gender,
      status: status,
      verified: verified,
      updatePasswordDate: Date.now(),
    });

    res.status(200).json({
      success: true,
      message: "rider Created successful",
      rider: rider,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllRider = async function (req, res, next) {
  try {
    let riders = await db.rider
      .find({})
      .populate(["address.country", "address.state", "address.city", "wallet"]);

    res.status(200).json({
      success: true,
      rider: riders,
    });
  } catch (error) {
    next(error);
  }
};

exports.filterRider = async function (req, res, next) {
  try {
    let { name, email, mobile, status } = req.query;

    if (!name && !email && !mobile && !status) {
      let riders = await db.rider
        .find({})
        .select({
          firstName: 1,
          lastName: 1,
          email: 1,
          mobile: 1,
          password: 1,
          DOB: 1,
          gender: 1,
          status: 1,
          "address.pincode": 1,
          "address.place": 1,
          loginDevice: 1,
          lastLoginActivity: 1,
          updatePasswordDate: 1,
          remark: 1,
          verified: 1,
        })
        .populate([
          {
            path: "address.country",
            model: "Country",
            select: { name: 1, _id: 0 },
          },
          {
            path: "address.state",
            model: "State",
            select: { name: 1, _id: 0 },
          },
          { path: "address.city", model: "City", select: { name: 1, _id: 0 } },
          { path: "wallet", model: "Wallet", select: { balance: 1, _id: 0 } },
        ]);

      res.status(200).json({
        success: true,
        riders: riders,
      });
    } else {
      let riders = await db.rider
        .find({
          $or: [
            { firstName: name },
            { lastName: name },
            { mobile: mobile },
            { email: email },
            { status: status },
          ],
        })
        .select({
          firstName: 1,
          lastName: 1,
          email: 1,
          mobile: 1,
          password: 1,
          DOB: 1,
          gender: 1,
          status: 1,
          "address.pincode": 1,
          "address.place": 1,
          loginDevice: 1,
          lastLoginActivity: 1,
          updatePasswordDate: 1,
          remark: 1,
          verified: 1,
        })
        .populate([
          {
            path: "address.country",
            model: "Country",
            select: { name: 1, _id: 0 },
          },
          {
            path: "address.state",
            model: "State",
            select: { name: 1, _id: 0 },
          },
          { path: "address.city", model: "City", select: { name: 1, _id: 0 } },
          { path: "wallet", model: "Wallet", select: { balance: 1, _id: 0 } },
        ]);

      res.status(200).json({
        success: true,
        riders: riders,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getActiveRider = async function (req, res, next) {
  try {
    let riders = await db.rider
      .find({
        status: "ACTIVE",
        verified: true,
      })
      .select({ firstName: 1, lastName: 1, email: 1, mobile: 1, gender: 1 });

    res.status(200).json({
      success: true,
      riders,
    });
  } catch (error) {
    next(error);
  }
};
