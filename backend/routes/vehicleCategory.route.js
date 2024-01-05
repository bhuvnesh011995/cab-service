const vehicleCategoryController = require("../controller/vehicleCategory.controller");

module.exports = function(app) {
    app.post("/test/api/v1/vehicleCategory/", [], vehicleCategoryController.addVehicleCategory);
    app.get("/test/api/v1/vehicleCategory/", [], vehicleCategoryController.getAllVehicleCategory      );

};
