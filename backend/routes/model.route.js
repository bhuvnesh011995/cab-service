const modelController = require("../controller/model.controller");

module.exports = function (app) {
  app.post("/test/api/v1/model/", [], modelController.addModel);
  //   app.get("/test/api/v1/model/filter/", [], modelController.filterModel);
  app.delete("/test/api/v1/model/:id", [], modelController.deleteModel);
  app.put("/test/api/v1/model/:id", [], modelController.updateModel);
  app.post("/test/api/v1/models/", [], modelController.addModels);
  app.get("/test/api/v1/models/", [], modelController.getModels);
  app.get("/test/api/v1/model/filter", [], modelController.modelFilter);
};
