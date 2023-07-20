const runModeController = require("../controller/runMode.controller")


module.exports = function(app){
    app.get("/test/api/v1/runMode/",[],runModeController.getAllRunMode)
}