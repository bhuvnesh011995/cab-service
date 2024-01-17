const vehicleTypeController = require("../controller/vehicleType.controller")
const multer = require("multer");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    let uniqueName;
    console.log(file);
    uniqueName = "file-" + Date.now() + "." + file.mimetype.split("/")[1];
    cb(null, uniqueName);
  },
});

upload = multer({ storage });
module.exports = function(app){
    app.post("/test/api/v1/vehicletype/",[upload.single("file")],vehicleTypeController.addVehicleType)
    // app.get("/test/api/v1/vehicletype/",[],vehicleTypeController.getAllVehicle)
    app.get("/test/api/v1/vehicletype/filter/",[],vehicleTypeController.filterVehicleType)
    app.delete("/test/api/v1/vehicletype/:id",[],vehicleTypeController.deleteVehicleType)
    app.put("/test/api/v1/vehicletype/:id",[],vehicleTypeController.updateVehicleType)
    app.get("/test/api/v1/vehicletype/",[],vehicleTypeController.getAllVehicleType)

}