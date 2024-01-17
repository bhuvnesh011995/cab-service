const packageController = require("../controller/package.controller");

module.exports = function (app) {
  app.post(
    "/test/api/v1/packages/addPackage",
    [],
    packageController.addPackage,
  );
  app.get(
    "/test/api/v1/packages/getAllPackages",
    [],
    packageController.getAllPackages,
  );
};
