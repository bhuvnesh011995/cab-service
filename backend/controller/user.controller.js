const admin = require("../model/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const verifyToken = promisify(jwt.verify);
const db = require("../model");
const signIn = async function (req, res, next) {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
      res.status(200).json({
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

    if (!isValid)
      res.status(200).json({
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
  } catch (error) {
    next(error);
  }
};

const signUp = async function (req, res, next) {
  try {
    // Apne password ko req.body se fetch karein
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    let userData = await admin.create(req.body);
    const { _id, name, username, status, createdAt } = userData;
    res.status(201).json({ _id, name, username, status, createdAt });
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
      }
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
  const data = req.body;

  try {
    // Check if newdata is defined
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "New data is missing",
      });
    }
    if (newdata.password) {
      data.password = bcrypt.hashSync(data.password, 8);
    }
    // Use updateOne method to update a specific document by _id
    const updatedAdmin = await admin.findByIdAndUpdate(req.params.id, data);
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
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginedUser = async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];
    const tokenData = await verifyToken(token, "abc 123 xyz");

    let user = await admin.findOne({
      _id: tokenData.id,
    });
    if (!user) return res.status(401).json({ message: "no user found" });
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
    if (err.name === "TokenExpiredError") {
      res
        .status(401)
        .json({ success: false, message: "token expired login again" });
    } else if (err.name === "JsonWebTokenError") {
      res.status(401).json({ success: false, message: "invalid token" });
    } else {
      next(err);
    }
  }
};

module.exports = {
  signIn,
  signUp,
  changePass,
  updateAdminData,
  loginedUser,
};
