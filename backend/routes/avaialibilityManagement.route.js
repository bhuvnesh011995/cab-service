const avaialibilityManagementController = require("../controller/avaialibilityManagement.controller")

module.exports = function(app){
    app.post("/test/api/v1/avaialibilityManagement/",[],avaialibilityManagementController.avaialibilityManagement)
    app.get("/test/api/v1/avaialibilityManagement/",[],avaialibilityManagementController.getAvaialibility)

}