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
    const { name, description, key } = req.body;

    let page = await db.page.create({
      name: name,
      metaDescription: description,
      metaKey: key,
    });

    res.status(200).json({
      success: true,
      message: "page Created",
      page: page,
    });
  } catch (error) {
    next(error);
  }
};

exports.filterPage = async function (req, res, next) {
  try {
    const { search } = req.query;

    if (!search) {
      let allPages = await db.page.find({});

      res.status(200).json({
        success: true,
        pages: allPages,
      });
    } else {
      let pages = await db.page.find({
        $text: {
          $search: search,
        },
      });

      res.status(200).json({
        success: true,
        pages: pages,
      });
    }
  } catch (error) {
    next(error);
  }
};
