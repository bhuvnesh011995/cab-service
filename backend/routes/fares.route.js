const fareController = require("../controller/fares.controller");

module.exports = function (app) {
  app.post("/test/api/v1/fare/addFare", [], fareController.addFare);
  app.get("/test/api/v1/fare/fetchAllFares", [], fareController.getAllIndiFare);
  app.get("/test/api/v1/fare/", [], fareController.filterIndiFare);
  app.get(
    "/test/api/v1/fare/getSelectedFare/:id",
    [],
    fareController.getSelectedFare,
  );
  app.delete(
    "/test/api/v1/fare/deleteFare/:id",
    [],
    fareController.deleteIndividualFare,
  );
};
