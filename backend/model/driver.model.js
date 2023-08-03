const {Schema,model} = require("mongoose");

const schema = new Schema({
    profilePhoto:{
        type:Buffer,
        contentType: String,

    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    DOB:{
        type:String
    },
    address:{
        country:{type:Schema.Types.ObjectId,ref:"Country"},
        state:{type:Schema.Types.ObjectId,ref:"State"},
        city:{type:Schema.Types.ObjectId,ref:"City"},
        place:String,
        pincode:Number
    },
    referralCode:{
        type:String,
        unique:true
    },
    license:{
        number:String,
        expireyDate:Date,
        photo:{
            type:Buffer,
            contentType:String
        }
    },
    aadhar:{
        number:Number,
        photo:{
            type:Buffer,
            contentType:String
        }
    },
    pan:{
        number:String,
        photo:{
            type:Buffer,
            contentType:String
        }
    },
    verifyed:{
        type:Boolean,
        default: false,
    },
    status:{
        type:String,
        require:true,
        default:"INACTIVE",
        enum:["ACTIVE","INACTIVE"]
    },
    createdBy:{type:Schema.Types.ObjectId,ref:"Admin"},
    updatedBy:{type:Schema.Types.ObjectId,ref:"Admin"},
    vehicles:[{type:Schema.Types.ObjectId,ref:"Vehicle"}]
},
{
    timestamps:true,
    collection:"Driver"
})



function generateReferralCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

  schema.pre('save', async function (next) {
    if (!this.referralCode) {
      let isUnique = false;
      while (!isUnique) {
        const referralCode = generateReferralCode();
        const existingUser = await this.constructor.findOne({ referralCode:referralCode });
        if (!existingUser) {
          this.referralCode = referralCode;
          isUnique = true;
        }
      }
    }
    next();
  });


  module.exports = model("Driver",schema)