const driverController = require("../controller/driver.controller")


module.exports = function(app){
    app.post("/test/api/v1/driver/",[],driverController.addDriver)
    app.get("/test/api/v1/driver/",[],driverController.getAllDriver)
    app.get("/test/api/v1/driver/filter/",[],driverController.filterDriver)
    app.put("/test/api/v1/driver/:driverId",[],driverController.updateDriver)
}