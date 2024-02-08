const rentalPromotionController = require("../controller/rentalPromotion.controller");

module.exports = function (app) {
  app.post(
    "/test/api/v1/rentalPromotion",
    [],
    rentalPromotionController.addRentalPromotion
  );
  app.get(
    "/test/api/v1/rentalPromotion",
    [],
    rentalPromotionController.getAllRentalPromotion
  );
  app.delete(
    "/test/api/v1/rentalPromotion/:id",
    [],
    rentalPromotionController.deleteRentalPromotion
  );
  app.put(
    "/test/api/v1/rentalPromotion/:id",
    [],
    rentalPromotionController.updateRentalPromotion
  );
};
