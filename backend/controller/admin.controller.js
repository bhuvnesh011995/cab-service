const admin = require("../model/admin.model");
const startofday = require("date-fns/startOfDay");
const endofday = require("date-fns/endOfDay");
const db = require("../model");

// filter admins using name,username,status,and date

exports.filter = async function (req, res, next) {
  try {
    let { name, username, email, status, from, to } = req.query;
    let admins;
    if (!name && !username && !email && !status && !from && !to) {
      admins = await admin.find();
    } else {
      if (from) from = startofday(new Date(from));
      else if (to && !from) from = startofday(new Date(0, 1, 1));
      else from = Date.now();
      if (to) to = endofday(new Date(to));
      else to = Date.now();

      admins = await admin.find({
        $or: [
          { name: name },
          { status: status },
          { username: username },
          {
            createdAt: {
              $gte: from,
              $lte: to,
            },
          },
        ],
      });
    }

    res.status(200).json(admins).end();
  } catch (error) {
    next(error);
  }
};

exports.getFilteredData = async (req, res, next) => {
  try {
    let { globalFilter, page, size, sort, dec } = req.query;
    let sortBy = sort;
    dec = dec === "true" ? -1 : 1;
    size = parseInt(size);
    let skip = (parseInt(page) - 1) * size;
    let data = await db.admin.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: globalFilter, $options: "i" } },
            { username: { $regex: globalFilter, $options: "i" } },
          ],
        },
      },
      { $sort: { [sortBy]: dec } },
      { $skip: skip },
      { $limit: size },
    ]);

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

exports.deleteAdminid = async function (req, res, next) {
  let { id } = req.params;

  try {
    const deletedAdmin = await admin.deleteOne({ id: id });

    if (deletedAdmin.deletedCount === 1) {
      res.status(200).json({
        success: true,
        message: "Admin deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some internal error occurred",
      error: e.message,
    });
  }
};

// delete admin function

exports.deleteAdmin = async function (req, res, next) {
  try {
    let { username } = req.params;

    try {
      await admin.deleteOne({ username: username });

      res.status(200).json({
        success: true,
        message: "admin deleted",
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "some internal error happen",
        error: e.message,
      });
    }
  } catch (error) {
    next(error);
  }
};
