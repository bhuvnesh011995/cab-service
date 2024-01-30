const templateController = require("../controller/template.controller")

<<<<<<< Updated upstream


module.exports = function(app){
    app.post("/test/api/v1/template/email/",[],templateController.addEmailTemplate)
    app.get("/test/api/v1/template/email/filter",[],templateController.filterEmailTemplate)
    app.post("/test/api/v1/template/sms/",[],templateController.addSmsTemplate)
    app.get("/test/api/v1/template/sms/filter",[],templateController.filterSmsTemplate)
}
=======
module.exports = function (app) {
  app.post(
    "/test/api/v1/template/email/",
    [],
    templateController.addEmailTemplate
  );
  app.get(
    "/test/api/v1/template/email/filter",
    [],
    templateController.filterEmailTemplate
  );
  app.post("/test/api/v1/template/sms/", [], templateController.addSmsTemplate);
  app.get(
    "/test/api/v1/template/sms/filter",
    [],
    templateController.filterSmsTemplate
  );
  app.put(
    "/test/api/v1/template/sms/:id",
    [],
    templateController.updateSmsTemplate
  );

  app.delete(
    "/test/api/v1/template/sms/:id",
    templateController.deleteSmsTemplate
  );
};
>>>>>>> Stashed changes
