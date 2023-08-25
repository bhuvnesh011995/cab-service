const promotionController = require("../controller/promotion.controller");
const middleware = require("../middleware/index");

module.exports = function (app) {
  app.post(
    "/test/api/v1/promotion/self",
    [
      middleware.validateId.validateCountryId,
      middleware.validateId.validateStateId,
      middleware.validateId.validateCityId,
    ],
    promotionController.addPromotion
  );
  app.get(
    "/test/api/v1/promotion/self/filter",
    [
      middleware.validateId.validateCountryId,
      middleware.validateId.validateStateId,
      middleware.validateId.validateCityId,
    ],
    promotionController.filterPromotion
  );
};
