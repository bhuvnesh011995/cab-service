const taxController = require("../controller/tax.controller");

module.exports = function (app) {
  app.post("/test/api/v1/tax", [], taxController.addTax);
  app.get("/test/api/v1/tax/filter/", [], taxController.filterTaxes);
  app.put("/test/api/v1/tax/:id", taxController.updateTax);
  app.delete("/test/api/v1/tax/:id", taxController.deleteTax);
};
