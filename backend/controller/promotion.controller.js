const db = require("../model/index");

exports.addPromotion = async function (req, res, next) {
  try {
    const { title, countryId, stateId, cityId, forUsers, status, description } =
      req.body;

    await db.promotion.create({
      title,
      country: countryId,
      state: stateId,
      city: cityId,
      forUsers,
      status,
      description,
    });

    res.status(200).json({
      success: true,
      message: "promotion created successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.filterPromotion = async function (req, res, next) {
  try {
    const { title, countryId, stateId, cityId, status, forUsers } = req.query;

    if (!title && !countryId && !stateId && !cityId && !status && !forUsers) {
      var promotions = await db.promotion
        .find({})
        .populate({ path: "state country city", select: "name" });
    } else {
      var promotions = await db.promotion
        .find({
          $or: [
            { title },
            { country: countryId },
            { state: stateId },
            { city: cityId },
            { status },
            { forUsers },
          ],
        })
        .populate({ path: "state country city", select: "name" });
    }

    res.status(200).json({
      success: true,
      promotions,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePromotion = async function (req, res) {
  const id = req.params.id;
  console.log(id);

  try {
      const result = await db.promotion.deleteOne({ _id: id });

      if (result.deletedCount === 1) {
          return res.status(200).json({ message: "Delete successfully" ,success: true });
      } else {
          return res.status(400).json({ message: "Promotion not found" });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }
};