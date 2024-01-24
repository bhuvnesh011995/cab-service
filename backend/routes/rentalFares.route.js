const rentalFareController = require("../controller/rentalFares.controller");

module.exports = function (app) {
  app.post(
    "/test/api/v1/rentals/addRental",
    [],
    rentalFareController.addRental,
  );
  app.get(
    "/test/api/v1/rentals/getAllRentals",
    [],
    rentalFareController.getAllRentals,
  );
  app.delete(
    "/test/api/v1/rentals/deleteRental/:id",
    [],
    rentalFareController.deleteRental,
  );
  app.get(
    "/test/api/v1/rentals/getSelectedRental/:id",
    [],
    rentalFareController.getSelectedRental,
  );
};
