const rentalFareController = require("../controller/rentalFare.controller")


module.exports = function (app){
    app.post("/test/api/v1/rentalFare/",[],rentalFareController.addRentalFare)
    app.get("/test/api/v1/rentalFare/",[],rentalFareController.filterRentalFare)
}