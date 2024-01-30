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
    let { title, body, forUsers, status } = req.body;

    await db.smsTemplate.create({
      title,
      body,
      forUsers,
      status,
    });

    res.status(200).json({
      success: true,
      message: "Template Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.filterSmsTemplate = async function (req, res, next) {
  try {
    let { title, status, forUsers } = req.query;

    if (!title && !status && !forUsers) {
      var templates = await db.smsTemplate.find({});
    } else {
      templates = await db.smsTemplate.find({
        $or: [{ title }, { status }, { forUsers }],
      });
    }

    res.status(200).json({
      success: true,
      templates,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSmsTemplate = async (req, res, next) => {
  try {
    await db.smsTemplate.deleteOne({ _id: req.params.id });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
