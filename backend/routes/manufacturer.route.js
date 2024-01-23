const manufacturerController = require("../controller/manufacturer.controller");

module.exports = function (app) {
  app.post(
    "/test/api/v1/manufacturer/",
    [],
    manufacturerController.addManufacturer
  );
  app.get(
    "/test/api/v1/manufacturer/",
    manufacturerController.getAllManufacturer
  );
  app.delete(
    "/test/api/v1/manufacturer/:id",
    manufacturerController.deleteManufacturer
  );
  app.put(
    "/test/api/v1/manufacturer/:id",
    manufacturerController.updatemanufacturer
  );
  app.get(
    "/test/api/v1/manufacturer/filter",
    manufacturerController.filterManufacturer
  );
};
