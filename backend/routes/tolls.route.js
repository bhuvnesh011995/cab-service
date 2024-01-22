const tollsController = require("../controller/tolls.Controller");

module.exports = function (app) {
  app.post("/test/api/v1/tolls/addToll", [], tollsController.addToll);
  app.get("/test/api/v1/tolls/getAllTolls", [], tollsController.getAllTolls);
  app.get(
    "/test/api/v1/tolls/getSelectedToll/:id",
    [],
    tollsController.getSelectedToll,
  );
  app.delete(
    "/test/api/v1/tolls/deleteToll/:id",
    [],
    tollsController.deleteToll,
  );
};
