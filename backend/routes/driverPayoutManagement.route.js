const driverPayoutController = require("../controller/driverPayoutManagement.controller");

module.exports = function (app) {
  app.post(
    "/test/api/v1/driverPayout",
    [],
    driverPayoutController.addDriverPayout
  );
  app.get(
    "/test/api/v1/driverPayout",
    [],
    driverPayoutController.getAllDriverPayout
  );

  app.delete(
    "/test/api/v1/driverPayout/:id",
    [],
    driverPayoutController.deleteDriverPayout
  );

  app.put(
    "/test/api/v1/driverPayout/:id",
    [],
    driverPayoutController.updateDriverPayout
  );

  app.get(
    "/test/api/v1/driverPayout/filter",
    [],
    driverPayoutController.filterDriverPayout
  );
};
