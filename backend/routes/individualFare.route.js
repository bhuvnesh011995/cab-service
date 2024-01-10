const indiFareController = require("../controller/individualFare.controller")

module.exports = function(app){
    app.post("/test/api/v1/individualFare/",[],indiFareController.addFare)
    app.get("/test/api/v1/individualFare/all",[],indiFareController.getAllIndiFare)
    app.get("/test/api/v1/individualFare/",[],indiFareController.filterIndiFare)
    app.delete("/test/api/v1/individualFare/:id",[],indiFareController.deleteIndividualFare)

}