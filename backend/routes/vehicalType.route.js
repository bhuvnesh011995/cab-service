const vehicleTypeController = require("../controller/vehicalType.controller")

module.exports = function(app){
    app.post("/test/api/v1/vehicaltype/",[],vehicleTypeController.addVehicalType)
    app.get("/test/api/v1/vehicaltype/",[],vehicleTypeController.getAllVehicle)
    app.get("/test/api/v1/vehicaltype/filter/",[],vehicleTypeController.filterVehicleType)
}