const {Schema,model} = require("mongoose")

const schema = new Schema({
    fromEmail:{
        type:String,
        required:true,
        default:""
    },

    siteTitle:{
        type:String,
        required:true,
        default:""
    },

    copyRightText:{
        type:String,
        required:true,
        default:""
    },

    fackbookURL:{
        type:String,
        required:true,
        default:""
    },

    twitterURL:{
        type:String,
        required:true,
        default:""
    },

    contactAddress:{
        type:String,
        required:true,
        default:""
    },

    phone:{
        type:String,
        required:true,
        default:""
    },

    googglePlusURL:{
        type:String,
        required:true,
        default:""
    },

    youtubeURL:{
        type:String,
        required:true,
        default:""
    },

    fromName:{
        type:String,
        required:true,
        default:""
    },

    bccEmail:{
        type:String,
        required:true,
        default:""
    },

    minDistance:{
        type:String,
        required:true,
        default:""
    },

    maxNoOfDriver:{
        type:String,
        required:true,
        default:""
    },

    cancelTimeDuration:{
        type:String,
        required:true,
        default:""
    },

    minWalletAmountIndiBooking:{
        type:String,
        required:true,
        default:""
    },

    minWallatAmountSharingBooking:{
        type:String,
        required:true,
        default:""
    },

    forgetPasswordEmail:{
        type:String,
        required:true,
        default:""
    },

    driverMaxGoHome:{
        type:String,
        required:true,
        default:""
    },

    driverGoHomeExpireTime:{
        type:String,
        required:true,
        default:""
    },

    driverGoHomeSearchingDistance:{
        type:String,
        required:true,
        default:""
    },

    outstationDriverAllowanceOneway:{
        type:String,
        required:true,
        default:""
    },

    outstationDriverAllowanceRoundTrip:{
        type:String,
        required:true,
        default:""
    },

    outstationNightChargeOneway:{
        type:String,
        required:true,
        default:""
    },

    outstationNightChargesRoundTrip:{
        type:String,
        required:true,
        default:""
    },

    outstaionNightFromTime:{
        type:String,
        required:true,
        default:""
    },

    outstaionNightToTime:{
        type:String,
        required:true,
        default:""
    },

    outstationDriverAllowanceOnewayTime:{
        type:String,
        required:true,
        default:""
    },

    outstationDriverAllowanceRoundTripTime:{
        type:String,
        required:true,
        default:""
    },

    outstationOnewayTripBaseKMPH:{
        type:String,
        required:true,
        default:""
    },

    outstationOnewayTripBaseTime:{
        type:String,
        required:true,
        default:""
    },

    outstationRoundTripBaseKMPH:{
        type:String,
        required:true,
        default:""
    },

    outstationRoundTripBaseTime:{
        type:String,
        required:true,
        default:""
    },

    outstaionIncreaseKM:{
        type:String,
        required:true,
        default:""
    },

},{
    collection:"Setting"
})


module.exports = model("Setting",schema)