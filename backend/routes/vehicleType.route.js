const vehicleTypeController = require("../controller/vehicleType.controller")

module.exports = function(app){
    app.post("/test/api/v1/vehicletype/",[],vehicleTypeController.addVehicleType)
    app.get("/test/api/v1/vehicletype/",[],vehicleTypeController.getAllVehicle)
    app.get("/test/api/v1/vehicletype/filter/",[],vehicleTypeController.filterVehicleType)
}