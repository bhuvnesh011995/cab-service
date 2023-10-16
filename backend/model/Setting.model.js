const {Schema,model} = require("mongoose")

const schema = new Schema({
    fromEmail:{
        type:String,
       
        default:""
    },

    siteTitle:{
        type:String,
     
        default:""
    },

    copyRightText:{
        type:String,
   
        default:""
    },

    fackbookURL:{
        type:String,
 
        default:""
    },

    twitterURL:{
        type:String,
     
        default:""
    },

    contactAddress:{
        type:String,
     
        default:""
    },

    phone:{
        type:String,
   
        default:""
    },

    googglePlusURL:{
        type:String,
    
        default:""
    },

    youtubeURL:{
        type:String,
  
        default:""
    },

    fromName:{
        type:String,

        default:""
    },

    bccEmail:{
        type:String,

        default:""
    },

    minDistance:{
        type:String,

        default:""
    },

    maxNoOfDriver:{
        type:String,
     
        default:""
    },

    cancelTimeDuration:{
        type:String,
  
        default:""
    },

    minWalletAmountIndiBooking:{
        type:String,

        default:""
    },

    minWallatAmountSharingBooking:{
        type:String,
    
        default:""
    },

    forgetPasswordEmail:{
        type:String,
     
        default:""
    },

    driverMaxGoHome:{
        type:String,
       
        default:""
    },

    driverGoHomeExpireTime:{
        type:String,
      
        default:""
    },

    driverGoHomeSearchingDistance:{
        type:String,
     
        default:""
    },

    outstationDriverAllowanceOneway:{
        type:String,
    

          

        default:""
    },

    outstationDriverAllowanceRoundTrip:{
        type:String,
     
        default:""
    },

    outstationNightChargeOneway:{
        type:String,
       
        default:""
    },

    outstationNightChargesRoundTrip:{
        type:String,
       
        default:""
    },

    outstaionNightFromTime:{
        type:String,
       
        default:""
    },

    outstaionNightToTime:{
        type:String,
      
        default:""
    },

    outstationDriverAllowanceOnewayTime:{
        type:String,
    
        default:""
    },

    outstationDriverAllowanceRoundTripTime:{
        type:String,
      
        default:""
    },

    outstationOnewayTripBaseKMPH:{
        type:String,
        
        default:""
    },

    outstationOnewayTripBaseTime:{
        type:String,
    
        default:""
    },

    outstationRoundTripBaseKMPH:{
        type:String,

        default:""
    },

    outstationRoundTripBaseTime:{
        type:String,
      
        default:""
    },

    outstaionIncreaseKM:{
        type:String,
     
        default:""
    },

},{
    collection:"Setting"
})


module.exports = model("Setting",schema)