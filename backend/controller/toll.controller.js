const db = require("../model/index");

exports.addToll = async function (req, res, next) {
  try {
    const { title, amount, status, location } = req.body;

    console.log(req.body);

    let locationDoc = await db.location.create({
      // lat: location.lat,
      // lng: location.lng,
    });

    await db.toll.create({
      title,
      amount,
      status,
      location: locationDoc._id,
    });

    res.status(200).json({
      success: true,
      message: "toll added successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.filterToll = async function (req, res, next) {
  try {
    const { title, status } = req.query;

    if (!title && !status) {
      var tolls = await db.toll.find({}).populate("location");
    } else {
      tolls = await db.toll
        .find({
          $or: [{ title }, { status }],
        })
        .populate("location");
    }

    res.status(200).json({
      success: true,
      tolls,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteToll = async function (req, res) {
  const id = req.params.id;
  console.log(id);

  try {
      const result = await db.toll.deleteOne({ _id: id });

      if (result.deletedCount === 1) {
          return res.status(200).json({ message: "Delete successfully" ,success: true });
      } else {
          return res.status(400).json({ message: "Model not found" });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }
};