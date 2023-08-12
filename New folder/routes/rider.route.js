const riderController = require("../controller/rider.controller")


module.exports = function(app){
    app.post("/test/api/v1/rider/",[],riderController.addRider)
    app.get("/test/api/v1/rider/",[],riderController.getAllRider)
    app.get("/test/api/v1/rider/filter/",[],riderController.filterRider)
}