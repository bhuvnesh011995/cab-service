const tollController = require("../controller/toll.controller")



module.exports = function(app){
    app.post("/test/api/v1/toll",[],tollController.addToll)
    app.get("/test/api/v1/toll/filter/",[],tollController.filterToll)
    app.delete("/test/api/v1/toll/:id",[],tollController.deleteToll)

}