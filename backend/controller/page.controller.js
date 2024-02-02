const db = require("../model/index");

exports.getAllPages = async function (req, res, next) {
  try {
    let allPages = await db.page.find({});

    res.status(200).json({
      success: true,
      pages: allPages,
    });
  } catch (error) {
    next(error);
  }
};

exports.addPage = async function (req, res, next) {
  try {
    let page = await db.page.create(req.body);

    res.status(201).json(page);
  } catch (error) {
    next(error);
  }
};

exports.filterPage = async function (req, res, next) {
  try {
    const { search } = req.query;
    let query = [];
    if (!search) query.push({ $match: {} });
    else
      query.push({
        $match: {
          $text: {
            $search: search,
          },
        },
      });
    let pages = await db.page.aggregate(query);

    res.status(200).json(pages);
  } catch (error) {
    next(error);
  }
};

exports.deletePage = async (req, res, next) => {
  try {
    let result = await db.page.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 1) return res.status(204).end();
    else
      return res
        .status(400)
        .json({ message: "some error occured, no page deleted" });
  } catch (error) {
    next(error);
  }
};

exports.updatePage = async (req, res, next) => {
  try {
    let page = await db.page.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(page);
  } catch (error) {
    next(error);
  }
};
