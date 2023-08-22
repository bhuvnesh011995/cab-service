const bookingController = require("../controller/booking.controller")


module.exports = function(app){
    app.post("/test/api/v1/booking/",[],bookingController.addBooking)
    app.get("/test/api/v1/booking/",[],bookingController.getAllBooking)
    app.get("/test/api/v1/booking/filter",[],bookingController.filterBooking)
    app.get("/test/api/v1/booking/:bookingId",[],bookingController.getBookingDetailsById)
}