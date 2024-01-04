const admin = require("../model/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signIn = async function (req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(404).json({
      success: false,
      message: "enter username or password",
    });
    return;
  }

  //   try {
  let user = await admin.findOne({
    username: username,
  });
  console.log("pppppppp", user);
  let isValid = user && bcrypt.compareSync(password, user?.password);
  console.log(isValid);
  if (!isValid)
    res.status(404).json({
      success: false,
      message: "invalid username or password",
    });
  else {
    const token = jwt.sign({ id: user._id }, "abc 123 xyz", {
      expiresIn: 500000,
    });
    res.status(200).json({
      success: true,
      name: user.name,
      username: user.username,
      email: user.email,
      token: token,
      role: user.role,
      permissions: user.permissions,
    });
  }
};

const signUp = async function (req, res, next) {
  const {
    name,
    username,
    email,
    password,
    country,
    state,
    city,
    status,
    selected,
  } = req.body;
  console.log("Request Body:", req.body);
  try {
    // Apne password ko req.body se fetch karein
    const hashedPassword = bcrypt.hashSync(password, 8);

    let userData = await admin.create({
      name: name,
      username: username,
      email: email,
      country: country,
      state: state,
      city: city,
      status: status,
      permissions: selected,
      password: hashedPassword, // Hashed password ko set karein
    });
    res.status(201).json({
      success: true,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      country: userData.country,
      state: userData.state,
      city: userData.city,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.country === 1) {
      console.error('Duplicate key error for "country" field:', error.message);
      res.status(400).json({
        success: false,
        message: 'Duplicate key error for "country" field',
      });
    } else {
      console.error("An error occurred:", error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  }
};

async function changePass(req, res, next) {
  const { newPassword, id } = req.body;

  try {
    await admin.updateOne(
      { _id: id },
      {
        password: bcrypt.hashSync(newPassword, 8),
      },
    );

    res
      .status(200)
      .json({
        success: true,
        message: "password changed successfully",
      })
      .end();
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "some err 2 happen",
      })
      .end();
  }
}

const updateAdminData = async (req, res, next) => {
  const { id, newdata } = req.body;

  try {
    // Check if newdata is defined
    if (!newdata) {
      return res.status(400).json({
        success: false,
        message: "New data is missing",
      });
    }
    if (newdata.password) {
      newdata.password = bcrypt.hashSync(newdata.password, 8);
    }
    // Use updateOne method to update a specific document by _id
    const updatedAdmin = await admin.findByIdAndUpdate(id, newdata);
    if (updatedAdmin) {
      return res.status(200).json({
        success: true,
        message: "Admin data updated successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
  } catch (error) {
    console.error("Error updating admin data:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginedUser = async (req, res, next) => {
  try {
    const tokenData = jwt.verify(req.params.token, "abc 123 xyz");
    let user = await admin.findOne({
      _id: tokenData.id,
    });
    res.status(200).json({
      success: true,
      name: user.name,
      username: user.username,
      email: user.email,
      token: req.params.token,
      role: user.role,
      permissions: user.permissions,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  signIn,
  signUp,
  changePass,
  updateAdminData,
  loginedUser,
};
