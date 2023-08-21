const fareController = require("../controller/fare.controller")


module.exports = function(app){
    app.get("/test/api/v1/fare/:fareFrom",[],fareController.getFares)
}