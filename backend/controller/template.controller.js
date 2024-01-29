const db = require("../model/index");

exports.addEmailTemplate = async function (req, res, next) {
  try {
    let template = await db.emailTemplate.create(req.body);

    res.status(201).json(template);
  } catch (error) {
    next(error);
  }
};

exports.filterEmailTemplate = async function (req, res, next) {
  try {
    const { title, forUsers, status } = req.query;

    let query = [{ $match: { $or: [] } }];

    if (title)
      query[0].$match.$or.push({ title: { $regex: title, $options: "i" } });
    if (forUsers)
      query[0].$match.$or.push({
        forUsers: { $regex: forUsers, $options: "i" },
      });
    if (status)
      query[0].$match.$or.push({ status: { $regex: status, $options: "i" } });

    if (!title && !forUsers && !status) {
      query[0].$match = {};
    }

    query.push({ $unset: "body" });
    let templates = await db.emailTemplate.aggregate(query);

    res.status(200).json(templates);
  } catch (error) {
    next(error);
  }
};

exports.addSmsTemplate = async function (req, res, next) {
  try {
    let template = await db.smsTemplate.create(req.body);

    res.status(201).json(template);
  } catch (error) {
    next(error);
  }
};

exports.filterSmsTemplate = async function (req, res, next) {
  try {
    const { title, forUsers, status } = req.query;

    let query = [{ $match: { $or: [] } }];

    if (title)
      query[0].$match.$or.push({ title: { $regex: title, $options: "i" } });
    if (forUsers)
      query[0].$match.$or.push({
        forUsers: { $regex: forUsers, $options: "i" },
      });
    if (status) query[0].$match.$or.push({ status });

    if (!title && !forUsers && !status) {
      query[0].$match = {};
    }

    let templates = await db.smsTemplate.aggregate(query);

    res.status(200).json(templates);
  } catch (error) {
    next(error);
  }
};

exports.updateSmsTemplate = async (req, res, next) => {
  try {
    let smsTemplate = await db.smsTemplate.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(smsTemplate);
  } catch (error) {
    next(error);
  }
};
