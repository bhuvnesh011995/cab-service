const db = require("../model/index");

exports.addEmail = async (req, res, next) => {
  try {
    const { body } = req;
    if (body?._id) {
      const getEmailTemplate = await db.emailTemplate.findOne({
        _id: body?._id,
      });
      if (getEmailTemplate) {
        const updateEmailTemplate = await db.emailTemplate.findOneAndUpdate(
          { _id: body?._id },
          { $set: body },
          { upsert: true, returnDocument: "after" },
        );
        return res.status(200).send(updateEmailTemplate);
      }
    }
    const emailTemplateResponse = await db.emailTemplate.create(body);
    return res.status(200).send(emailTemplateResponse);
  } catch (err) {
    next(err);
  }
};

exports.fetchEmailTemplates = async (req, res, next) => {
  try {
    const { query } = req;
    const emailTemplateQuery = [];

    emailTemplateQuery.push({
      $match: {
        $or: [
          {
            $expr: {
              $regexMatch: {
                input: { $toLower: "$title" },
                regex: { $toLower: query.search },
                options: "i",
              },
            },
          },
          {
            $expr: {
              $regexMatch: {
                input: { $toLower: "$subject" },
                regex: { $toLower: query.search },
                options: "i",
              },
            },
          },
          {
            $expr: {
              $regexMatch: {
                input: { $toLower: "$status" },
                regex: { $toLower: query.search },
                options: "i",
              },
            },
          },
        ],
      },
    });

    const emailTemplatesResponse = await db.emailTemplate.aggregate(
      emailTemplateQuery,
    );
    return res.status(200).send(emailTemplatesResponse);
  } catch (err) {
    next(err);
  }
};

exports.getSelectedEmailTemplate = async (req, res, next) => {
  try {
    const emailTemplateResponse = await db.emailTemplate.findOne({
      _id: req.params.id,
    });
    return res.status(200).send(emailTemplateResponse);
  } catch (err) {
    next(err);
  }
};

exports.deleteEmailTemplate = async (req, res, next) => {
  try {
    const deleteEmailTemplate = await db.emailTemplate.deleteOne({
      _id: req.params.id,
    });
    return res
      .status(200)
      .send({ message: "Email Template Deleted Successfully" });
  } catch (err) {
    next(err);
  }
};
