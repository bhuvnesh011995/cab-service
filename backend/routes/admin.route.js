const adminController = require("../controller/admin.controller");

module.exports = function (app) {
  app.get("/test/api/v1/admin/:id", adminController.getAdminById);

  app.get("/test/api/v1/admins/filter", adminController.filter);
  app.delete("/test/api/v1/admin/:id", adminController.deleteAdmin);
  app.put("/test/api/v1/admin/:id", adminController.updateAdmin);
  app.get("/test/api/v1/admins/", adminController.getFilteredData);
};
