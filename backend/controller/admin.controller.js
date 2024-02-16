const admin = require("../model/admin.model");
const startofday = require("date-fns/startOfDay");
const endofday = require("date-fns/endOfDay");
const db = require("../model");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

// filter admins using name,username,status,and date

exports.filter = async function (req, res, next) {
  try {
    let { name, username, email, status, from, to } = req.query;
    let query = [{ $match: { $or: [] } }];
    if (name)
      query[0].$match.$or.push({ name: { $regex: name, $options: "i" } });
    if (username)
      query[0].$match.$or.push({
        username: { $regex: username, $options: "i" },
      });
    if (status) query[0].$match.$or.push({ status });
    if (from)
      query[0].$match.$or = [
        ...query[0].$match.$or,
        { createdAt: { $gte: startofday(new Date(from)) } },
      ];

    if (to)
      query[0].$match.$or = [
        ...query[0].$match.$or,
        { createdAt: { $lte: endofday(new Date(to)) } },
      ];
    if (!query[0].$match.$or.length) query[0].$match = {};
    query.push({
      $project: {
        name: 1,
        username: 1,
        status: 1,
        createdAt: 1,
      },
    });

    let admins = await admin.aggregate(query);

    res.status(200).json(admins).end();
  } catch (error) {
    next(error);
  }
};

exports.getFilteredData = async (req, res, next) => {
  try {
    let { globalFilter, start, size, sort } = req.query;
    if (sort) sort = JSON.parse(sort) ?? [];

    let sortBy = sort[0]?.id ?? "name";
    let desc = sort[0]?.desc ? 1 : -1;

    size = (size && parseInt(size)) ?? 10;
    let skip = (start && parseInt(start)) ?? 0;
    console.log(globalFilter, size, start, sortBy, sort, desc, "hii");
    let data = await db.admin.aggregate([
      {
        $facet: {
          total: [
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
              },
            },
          ],
          rows: [
            {
              $match: {
                $or: [
                  { name: { $regex: globalFilter, $options: "i" } },
                  { username: { $regex: globalFilter, $options: "i" } },
                ],
              },
            },
            { $sort: { [sortBy]: desc } },
            { $skip: skip },
            { $limit: size },
          ],
        },
      },
    ]);

    res
      .status(200)
      .json({ total: data[0]?.total[0].count, data: data[0].rows });
  } catch (error) {
    next(error);
  }
};

// delete admin function

exports.deleteAdmin = async function (req, res, next) {
  try {
    let { id } = req.params;
    await admin.deleteOne({ _id: id });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.getAdminById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const admin = await db.admin.findById(id);
    console.log(admin, "admin");

    if (!admin) return res.status(400).end();
    else return res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};

exports.updateAdmin = async (req, res, next) => {
  try {
    if (req.body?.password)
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    let admin = await db.admin.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};
