const db = require("../model/index");

exports.addVehicleCategory = async function (req, res) {
  console.log(req.body);
  let obj = { ...req.body };

  try {
    const vehicleCategory = await db.vehicleCategory.create(obj);

    return res.status(201).send({
      vehicleCategory: vehicleCategory,
      message: "vehicleCategory added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: "Internal Server Error",
    });
  }
};

exports.getAllVehicleCategory= async function(req,res){
    try{
      const vehicleCategory = await db.vehicleCategory.find()
      return res.status(200).json({
        success: true,
        message: " vehicleCategory  successfully get",
        vehicleCategory: vehicleCategory,
      })
    }
    catch(error){
        console.error(error)
        return res.status(500).send({
            error:"Internal Server Error"
        })
    }

}