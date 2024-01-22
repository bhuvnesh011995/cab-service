const cityController = require("../controller/city.controller");

module.exports = function (app) {
  app.post("/test/api/v1/city/", [], cityController.addCity);
  app.put("/test/api/v1/city/map/:mapId", [], cityController.updateMapById);
  app.get(
    "/test/api/v1/city/:country/:state",
    [],
    cityController.getcityBystateAndCountry
  );
  app.get("/test/api/v1/city/", cityController.filterCity);

  app.get("/test/api/v1/cities/filter", cityController.filterCities);
  app.get("/test/api/v1/city/:stateId", [], cityController.getCityByStateId);
  app.get("/test/api/v1/cities/:stateId", cityController.getCitiesByState);
  app.delete("/test/api/v1/city/:id", [], cityController.deleteCity);
};
