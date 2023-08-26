const taxController = require("../controller/tax.controller")


module.exports = function(app){
    app.post("/test/api/v1/tax",[],taxController.addTax)
    app.get("/test/api/v1/tax/filter/",[],taxController.filterTax)
}