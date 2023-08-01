const {Schema,model} = require("mongoose")

const schema = new Schema({
    fromEmail:String,

    siteTitle:String,

    copyRightText:String,

    fackbookURL:String,

    twitterURL:String,

    contactAddress:String,

    phone:String,

    googglePlusURL:String,

    youtubeURL:String,

    fromName:String,

    bccEmail:String,

    minDistance:String,

    maxNoOfDriver:String,

    cancelTimeDuration:String,

    minWalletAmountIndiBooking:String,

    minWallatAmountSharingBooking:String,

    forgetPasswordEmail:String,

    driverMaxGoHome:String,

    driverGoHomeExpireTime:String,

    driverGoHomeSearchingDistance:String,

    outstationDriverAllowanceOneway:String,

    outstationDriverAllowanceRoundTrip:String,

    outstationNightChargeOneway:String,

    outstationNightChargesRoundTrip:String,

    outstaionNightFromTime:String,

    outstaionNightToTime:String,

    outstationDriverAllowanceOnewayTime:String,

    outstationDriverAllowanceRoundTripTime:String,

    outstationOnewayTripBaseKMPH:String,

    outstationOnewayTripBaseTime:String,

    outstationRoundTripBaseKMPH:String,

    outstationRoundTripBaseTime:String,

    outstaionIncreaseKM:String,

},{
    collection:"Setting"
})


module.exports = model("Setting",schema)