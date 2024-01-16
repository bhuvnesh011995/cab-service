const vehicleTypeController = require("../controller/vehicleType.controller")
const {uploadFile} = require("../middleware/upload")

module.exports = function(app){
    app.post("/test/api/v1/vehicletype/",[uploadFile.single("file")],vehicleTypeController.addVehicleType)
    // app.get("/test/api/v1/vehicletype/",[],vehicleTypeController.getAllVehicle)
    app.get("/test/api/v1/vehicletype/filter/",[],vehicleTypeController.filterVehicleType)
    app.delete("/test/api/v1/vehicletype/:id",[],vehicleTypeController.deleteVehicleType)
    app.put("/test/api/v1/vehicletype/:id",[],vehicleTypeController.updateVehicleType)
    app.get("/test/api/v1/vehicletype/",[],vehicleTypeController.getAllVehicleType)

}