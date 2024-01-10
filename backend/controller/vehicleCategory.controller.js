const db = require("../model/index");

exports.addVehicleCategory = async function (req, res) {
  console.log(req.body);
  let obj = { ...req.body };

  try {
    const vehicleCategory = await db.vehicleCategory.create(obj);

    return res.status(201).send({
      vehicleCategory: vehicleCategory,
      message: "vehicleCategory added successfully", success: true 
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

exports.deleteVehicleCategory = async function (req,res){
  const id = req.params.id
  try{
    const result = await db.vehicleCategory.deleteOne({_id: id})
    if(result.deletedCount === 1){
      return res.status(200).json({message : "vehicle category delete successfully"});
    }
    else{
      return res.status(400).json({message:"delete category nont found"})
    }
  }
  catch(error){
    console.log(error)
    return res.status(5000).json({message:"Internal Server Error"})
  }
}




exports.updateVehicleCategory = async function (req, res, next) {
  try {
      const { id } = req.params;
      console.log("id", req.body);


      let obj = {};
    
      if(req.body.vehicleCategory) obj.vehicleCategory = req.body.vehicleCategory
      if(req.body.status) obj.status = req.body.status

      await db.vehicleCategory.updateOne({ _id:id}, { $set: obj});
    
      res.status(200).json({message:"update successfully"})

  } catch (error) {
      console.log(error);

      res.status(500).json({
          success: false,
          message: "Internal error occurred",
      });
  }
};