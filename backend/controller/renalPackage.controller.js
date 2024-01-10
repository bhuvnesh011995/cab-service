const db = require("../model/index");

exports.addPackage = async function (req, res, next) {
  try {
    const { name, maxDuration, maxDistance, status } = req.body;
    const package = await db.rentalPackage.create({
      name: name,
      maxDuration: maxDuration,
      maxDistance: maxDistance,
      status: status,
    });

    res.status(200).json({
      success: true,
      message: "package Added",
      package: package,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllPackage = async function (req, res, next) {
  try {
    const allPackage = await db.rentalPackage
      .find({})
      .select({ name: 1 })
      .lean();

    res.status(200).json({
      success: true,
      packages: allPackage,
    });
  } catch (error) {
    next(error);
  }
};

exports.filterPackage = async function (req, res, next) {
  try {
    const { name, status } = req.query;

    if (!name && !status) {
      var packages = await db.rentalPackage.find({});

      res.status(200).json({
        success: true,
        packages: packages,
      });
    } else {
      packages = await db.rentalPackage.find({
        $or: [{ name: name }, { status: status }],
      });

      res.status(200).json({
        success: true,
        packages: packages,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.deleteRenalPackage = async function (req, res) {
  const id = req.params.id;
  console.log(id);

  try {
      const result = await db.rentalPackage.deleteOne({ _id: id });

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