
module.exports ={
    make : require("./make.model"),
    model : require("./model.model"),
    state : require("./state.model"),
    country : require("./country.model"),
    service : require("./services.model"),
    admin : require("./admin.model"),
    city : require("./city.model"),
    vehicleType:require("./vehicleType.model"),
    runMode:require("./runMode.model"),
    cityService:require("./cityService.model"),
    indiFareCountry:require("./individualFare/individualFare.country.model"),
    indiFareCity:require("./individualFare/individualFare.city.model"),
    indiFareState:require("./individualFare/individualFare.state.model"),
    perKMCharge:require("./perKMCharge.model"),
}