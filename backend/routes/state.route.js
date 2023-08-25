const stateController = require("../controller/state.controller")

module.exports = function(app){
    app.post("/test/api/v1/state/",[],stateController.addState)
    app.get("/test/api/v1/state/",[],stateController.getallStateByCountry)
    app.get("/test/api/v1/state/:countryId",[],stateController.getallStateByCountryId)
    app.get("/test/api/v1/state/filter/",[],stateController.filterState)
}