const citycountroller = require("../controller/city.controller")

module.exports = function(app){
    app.post("/test/api/v1/city/",[],citycountroller.addCity)
    app.get("/test/api/v1/city/:name",[],citycountroller.getcityById)
}