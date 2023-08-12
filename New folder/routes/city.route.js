const citycountroller = require("../controller/city.controller")

module.exports = function(app){
    app.post("/test/api/v1/city/",[],citycountroller.addCity)
    app.get("/test/api/v1/city/:country/:state",[],citycountroller.getcityBystateAndCountry)
    app.get("/test/api/v1/city/",citycountroller.filterCity)
}