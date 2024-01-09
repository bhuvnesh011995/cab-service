const adminController = require("../controller/admin.controller");

module.exports = function (app) {
  app.get("/test/api/v1/admin/filter/", adminController.filter);
  app.delete("/test/api/v1/admin/:userrname", adminController.deleteAdmin);
  app.delete("/test/api/v1/admins/:_id", adminController.deleteAdminid);
  app.get("/test/api/v1/admins/", adminController.getFilteredData);
};
