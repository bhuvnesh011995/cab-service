module.exports = {
  make: require("./make.model"),
  model: require("./model.model"),
  state: require("./state.model"),
  country: require("./country.model"),
  service: require("./services.model"),
  admin: require("./admin.model"),
  city: require("./city.model"),
  vehicleType: require("./vehicleType.model"),
  runMode: require("./runMode.model"),
  cityService: require("./cityService.model"),
  indiFareCountry: require("./individualFare/individualFare.country.model"),
  indiFareCity: require("./individualFare/individualFare.city.model"),
  indiFareState: require("./individualFare/individualFare.state.model"),
  perKMCharge: require("./perKMCharge.model"),
  rentalFareCountry: require("./rentalFare/rentalFare.country.model"),
  rentalFareState: require("./rentalFare/rentalFare.state.model"),
  rentalFareCity: require("./rentalFare/rentalFare.city.model"),
  rentalPackage: require("./rentalFare/rentalPackage.model"),
  setting: require("./Setting.model"),
  page: require("./pageManagement.model"),
  rider: require("./rider.model"),
  wallet: require("./wallet.model"),
  driver: require("./driver.model"),
  vehicle: require("./vehicle.model"),
  booking: require("./booking.model"),
  transaction: require("./transaction.model"),
  emailTemplate: require("./template/email.template.model"),
  smsTemplate: require("./template/sms.template.model"),
  promotion: require("./promotion.model"),
  referral: require("./referral.model"),
  toll: require("./toll.model"),
  tax: require("./tax.model"),
  location: require("./location.model"),
  sos: require("./SOS.model"),
  territory: require("./territory.model"),
  avaialibilityManagement: require("./avaialibilityManagement.model"),
  vehicleCategory: require("./VehicleCategory.model"),
  manufacturer: require("./manufacturer.model"),
  promoCode: require("./promoCode.model"),
  riderNotification: require("./notification/rider.model"),
  rentalPromotion: require("./RentalPromotion/rentalPromotion.model"),
  driverNotification: require("./notification/driver.model"),
};
