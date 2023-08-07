const vehicleController = require("../controller/vehicle.controller")

module.exports = function(app){
    app.post("/test/api/v1/vehicle/",[],vehicleController.addVehicle)
    app.get("/test/api/v1/vehicle/",[],vehicleController.getAllVehicle)
    app.get("/test/api/v1/vehicle/:driverId",[],vehicleController.getVehicleByDriver)
}