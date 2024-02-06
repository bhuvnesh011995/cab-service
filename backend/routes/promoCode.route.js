const promoCodeController = require("../controller/promoCode.controller");

module.exports = function (app) {
  app.post("/test/api/v1/promoCode", [], promoCodeController.addPromoCode);
  app.get("/test/api/v1/promoCode", [], promoCodeController.getAllPromoCode);
  app.delete(
    "/test/api/v1/promoCode/:id",
    [],
    promoCodeController.deletePromoCode
  );
};
