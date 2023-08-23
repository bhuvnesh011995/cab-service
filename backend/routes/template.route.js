const templateController = require("../controller/template.controller")



module.exports = function(app){
    app.post("/test/api/v1/template/email/",[],templateController.addEmailTemplate)
}