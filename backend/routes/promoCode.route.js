const promoCodeController = require("../controller/promoCode.controller");

module.exports = function (app) {
  app.post("/test/api/v1/promoCode", [], promoCodeController.addPromoCode);
  app.get("/test/api/v1/promoCode", [], promoCodeController.getAllPromoCode);
  app.get(
    "/test/api/v1/promoCode/filter",
    [],
    promoCodeController.filterPromoCode
  );

  app.delete(
    "/test/api/v1/promoCode/:id",
    [],
    promoCodeController.deletePromoCode
  );
  app.put(
    "/test/api/v1/promoCode/:id",
    [],
    promoCodeController.updatePromoCode
  );
};
