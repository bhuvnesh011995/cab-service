const vehicalTypeController = require("../controller/vehicalType.controller")

module.exports = function(app){
    app.post("/test/api/v1/vehicaltype/",[],vehicalTypeController.addVehicalType)
}