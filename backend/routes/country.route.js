const countryController = require("../controller/country.controller")


module.exports = function(app){
    app.post("/test/api/v1/country/",[],countryController.addCountry)
    app.get("/test/api/v1/country/",[],countryController.getallCountry)
    app.get("/test/api/v1/country/filter/",[],countryController.filterCountry)

}