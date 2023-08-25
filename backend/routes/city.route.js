const cityController = require("../controller/city.controller")

module.exports = function(app){
    app.post("/test/api/v1/city/",[],cityController.addCity)
    app.get("/test/api/v1/city/:country/:state",[],cityController.getcityBystateAndCountry)
    app.get("/test/api/v1/city/",cityController.filterCity)
    app.get("/test/api/v1/city/:stateId",[],cityController.getCityByStateId)
}