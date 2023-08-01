const {Schema,model} = require("mongoose")

const schema = new Schema({
    profilePhoto:{
        data:Buffer,
        contentType: String
    },
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true
    },
    id:[{
        idName:{
            type:String,
            require:true
        },
        idNumber:{
            type:String,
            require:true
        }
    }],
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    password:{
        type:String,
    },
    DOB:{
        type:Date,
    },
    country:{type:Schema.Types.ObjectId,ref:"Country"},

    state:{type:Schema.Types.ObjectId,ref:"State"},

    city:{type:Schema.Types.ObjectId,ref:"City"},

    address:{
        type:String,
        require:true
    },

    pincode:{type:Number,require:true},

    gender:{type:String,require:true,enum:["MALE","FEMALE"]},

    loginDevice:String,

    lastLoginActivity:String,

    updatePasswordDate:Date,

    remark:String,

    RideHistory:[{type:Schema.Types.ObjectId,ref:"RiderBooking"}],

    verified:{
        type:Boolean,
        default:false
    }

},{
    collection:"Rider"
})


module.exports = model("Rider",schema)