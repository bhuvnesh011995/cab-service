const {Schema,model} = require("mongoose")

const schema = new Schema({
    fromEmail:{
        type:String,
        require:true,
        default:""
    },

    siteTitle:{
        type:String,
        require:true,
        default:""
    },

    copyRightText:{
        type:String,
        require:true,
        default:""
    },

    fackbookURL:{
        type:String,
        require:true,
        default:""
    },

    twitterURL:{
        type:String,
        require:true,
        default:""
    },

    contactAddress:{
        type:String,
        require:true,
        default:""
    },

    phone:{
        type:String,
        require:true,
        default:""
    },

    googglePlusURL:{
        type:String,
        require:true,
        default:""
    },

    youtubeURL:{
        type:String,
        require:true,
        default:""
    },

    fromName:{
        type:String,
        require:true,
        default:""
    },

    bccEmail:{
        type:String,
        require:true,
        default:""
    },

    minDistance:{
        type:String,
        require:true,
        default:""
    },

    maxNoOfDriver:{
        type:String,
        require:true,
        default:""
    },

    cancelTimeDuration:{
        type:String,
        require:true,
        default:""
    },

    minWalletAmountIndiBooking:{
        type:String,
        require:true,
        default:""
    },

    minWallatAmountSharingBooking:{
        type:String,
        require:true,
        default:""
    },

    forgetPasswordEmail:{
        type:String,
        require:true,
        default:""
    },

    driverMaxGoHome:{
        type:String,
        require:true,
        default:""
    },

    driverGoHomeExpireTime:{
        type:String,
        require:true,
        default:""
    },

    driverGoHomeSearchingDistance:{
        type:String,
        require:true,
        default:""
    },

    outstationDriverAllowanceOneway:{
        type:String,
        require:true,
        default:""
    },

    outstationDriverAllowanceRoundTrip:{
        type:String,
        require:true,
        default:""
    },

    outstationNightChargeOneway:{
        type:String,
        require:true,
        default:""
    },

    outstationNightChargesRoundTrip:{
        type:String,
        require:true,
        default:""
    },

    outstaionNightFromTime:{
        type:String,
        require:true,
        default:""
    },

    outstaionNightToTime:{
        type:String,
        require:true,
        default:""
    },

    outstationDriverAllowanceOnewayTime:{
        type:String,
        require:true,
        default:""
    },

    outstationDriverAllowanceRoundTripTime:{
        type:String,
        require:true,
        default:""
    },

    outstationOnewayTripBaseKMPH:{
        type:String,
        require:true,
        default:""
    },

    outstationOnewayTripBaseTime:{
        type:String,
        require:true,
        default:""
    },

    outstationRoundTripBaseKMPH:{
        type:String,
        require:true,
        default:""
    },

    outstationRoundTripBaseTime:{
        type:String,
        require:true,
        default:""
    },

    outstaionIncreaseKM:{
        type:String,
        require:true,
        default:""
    },

},{
    collection:"Setting"
})


module.exports = model("Setting",schema)