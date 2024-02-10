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

  app.get(
    "/test/api/v1/rentalPromotion/filter",
    [],
    rentalPromotionController.filterRentalPromotion
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
