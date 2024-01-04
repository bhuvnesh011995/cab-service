const driverController = require("../controller/driver.controller");
const { uploadFile } = require("../middleware/upload");

module.exports = function (app) {
  app.post(
    "/test/api/v1/driver/",
    [uploadFile.any()],
    driverController.addDriver,
  );
  app.get("/test/api/v1/driver/", [], driverController.getAllDriver);
  app.get("/test/api/v1/driver/filter/", [], driverController.filterDriver);
  app.put("/test/api/v1/driver/:driverId", [], driverController.updateDriver);
  app.get("/test/api/v1/driver/active/", [], driverController.getActiveDriver);
};
