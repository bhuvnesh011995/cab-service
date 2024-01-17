const fareController = require("../controller/fares.controller");

module.exports = function (app) {
  app.post("/test/api/v1/fares/addFare", [], fareController.addFare);
  app.get(
    "/test/api/v1/fares/fetchAllFares",
    [],
    fareController.getAllIndiFare,
  );
  app.get(
    "/test/api/v1/fares/getSelectedFare/:id",
    [],
    fareController.getSelectedFare,
  );
  app.delete(
    "/test/api/v1/fares/deleteFare/:id",
    [],
    fareController.deleteIndividualFare,
  );
};
