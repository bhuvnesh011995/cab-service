const promoCodeController = require("../controller/promoCode.controller");

module.exports = function (app) {
  app.post("/test/api/v1/promoCode", [], promoCodeController.addPromoCode);
};
