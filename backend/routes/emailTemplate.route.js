const emailTemplatesController = require("../controller/emailTemplates.controller");

module.exports = function (app) {
  app.post(
    "/test/api/v1/emailTemplates/addEmail",
    [],
    emailTemplatesController.addEmail,
  );
  app.get(
    "/test/api/v1/emailTemplates/fetchEmailTemplates",
    [],
    emailTemplatesController.fetchEmailTemplates,
  );
  app.get(
    "/test/api/v1/emailTemplates/getSelectedEmailTemplate/:id",
    [],
    emailTemplatesController.getSelectedEmailTemplate,
  );
  app.delete(
    "/test/api/v1/emailTemplates/deleteEmailTemplate/:id",
    [],
    emailTemplatesController.deleteEmailTemplate,
  );
};
