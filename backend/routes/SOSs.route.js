const SOSsController = require("../controller/SOSs.controller");

module.exports = function (app) {
  app.post("/test/api/v1/SOS/addSOS", [], SOSsController.addSOS);
  app.get("/test/api/v1/SOS/fetchAllSOSs", [], SOSsController.fetchAllSOSs);
  app.get(
    "/test/api/v1/SOS/getSelectedSOS/:id",
    [],
    SOSsController.getSelectedSOS,
  );
  app.delete("/test/api/v1/SOS/deleteSOS/:id", [], SOSsController.deleteSOS);
};
