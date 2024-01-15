const Model = require("../model/model.model");
const Make = require("../model/make.model");

exports.addModel = async function (req, res, next) {
  try {
    const { name, make, status, year } = req.body;
    console.log("Request Body:", req.body);

    try {
      // Attempt to find a 'Make' document with the specified name
      const makeDoc = await Make.findOne({ name: make });

      if (!makeDoc) {
        console.log("Make not found:", make);
        return res.status(404).json({
          success: false,
          error: "Make not found",
        });
      }

      console.log("Found Make:", makeDoc);

      // Create a 'Model' document with the provided data and the 'makeDoc' reference
      const model = await Model.create({
        name: name,
        status: status,
        year: year,
        make: makeDoc._id,
      });

      console.log("Created Model:", model);

      // Update the 'Make' document to add the 'model' reference
      await Make.updateOne(
        { name: make },
        {
          $push: { model: model._id },
        }
      );

      console.log("Updated Make:", makeDoc);

      // Respond with a success message and 'makeDoc' data
      return res.status(200).json({
        success: true,
        data: JSON.stringify(makeDoc),
      });
    } catch (e) {
      // Handle any errors that occur during the process
      console.error("Error:", e);
      return res.status(500).json({
        success: false,
        error: e.message,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.addState = async function (req, res, next) {
  try {
    const { name, country, status, stateCode } = req.body;

    const countryDoc = await Country.findOne({ name: country });

    const state = await State.create({
      name: name,
      status: status,
      stateCode: stateCode,
      country: countryDoc._id,
    });

    await Country.updateOne(
      { name: country },
      {
        $push: { state: state._id },
      }
    );

    res
      .status(202)
      .json({
        success: true,
        message: "state added",
      })
      .end();
  } catch (error) {
    next(error);
  }
};

exports.getModel = async function (req, res, next) {
  try {
    let { name, make, status, year } = req.query;

    const models = await Model.find({ name: name }).populate("make").exec();

    res.status(200).json({
      success: true,
      data: models,
    });
  } catch (error) {
    next(error);
  }
};

exports.filterModel = async function (req, res, next) {
  let { name, make, status } = req.query;

  let models;

  try {
    if (!name && !make && !status) {
      models = await Model.find({})
        .populate({ path: "make", select: "name" })
        .lean();
    } else {
      if (make.length) {
        const makeDoc = await Make.findOne({ name: make });
        make = makeDoc._id;
      } else make = null;
      models = await Model.find({
        $or: [{ name: name }, { make: make }, { status: status }],
      }).populate({ path: "make", select: "name" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "some error happen",
      error: err.message,
    });
    return;
  }
  res.status(200).json({
    success: true,
    modelList: models,
  });
};


exports.deleteModel = async function (req, res) {
    const id = req.params.id;
    console.log(id);

    try {
        const result = await Model.deleteOne({ _id: id });

        if (result.deletedCount === 1) {
            return res.status(200).json({ message: "Delete successfully", success: true });
        } else {
            return res.status(400).json({ message: "Model not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.updateModel = async function(req,res){
  try{
    const {id} = req.params
    console.log(id)
    console.log(req.body)
     let obj = {};
     if(req.body.name) obj.name  = req.body.name
     if(req.body.make) obj.make  = req.body.make
     if(req.body.status) obj.status  = req.body.status
     await Model.updateOne({ _id:id}, { $set: obj});
     res.status(200).json({message:"update successfully", success: true,data:obj})
  }
  catch(error){
    res.status(500).json({
      success: false,
      message: "Internal error occurres"
    })
  }
}