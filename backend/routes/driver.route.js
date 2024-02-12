const driverController = require("../controller/driver.controller");
const { uploadFile } = require("../middleware/upload");

module.exports = function (app) {
  app.post(
    "/test/api/v1/drivers/addDriver",
    [uploadFile.any()],
    driverController.addDriver,
  );
  app.get(
    "/test/api/v1/drivers/fetchAllDrivers",
    [],
    driverController.getAllDriver,
  );

  app.get(
    "/test/api/v1/drivers/getSelectedDriver/:id",
    [],
    driverController.getSelectedDriver,
  );

  app.get("/test/api/v1/drivers/filter/", [], driverController.filterDriver);
  app.put(
    "/test/api/v1/drivers/getSelectedDriver/:driverId",
    [],
    driverController.updateDriver,
  );
  app.get("/test/api/v1/drivers/active/", [], driverController.getActiveDriver);
};
