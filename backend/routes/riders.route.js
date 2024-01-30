const ridersController = require("../controller/riders.Controller");
const { uploadFile } = require("../middleware/upload");

module.exports = function (app) {
  app.post(
    "/test/api/v1/riders/addRider",
    [uploadFile.single("file")],
    ridersController.addRider,
  );
  app.get(
    "/test/api/v1/riders/getAllRiders",
    [],
    ridersController.getAllRiders,
  );
  app.get(
    "/test/api/v1/riders/getSelectedRider/:id",
    [],
    ridersController.getSelectedRider,
  );
  app.delete(
    "/test/api/v1/riders/deleteRider/:id",
    [],
    ridersController.deleteRider,
  );
};
