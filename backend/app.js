const app =  require("express")();
const {admin,service,setting} = require("./model/index")
const dbConfig = require("./config/db.config")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const RunMode = require("./model/runMode.model")
const runmodeConstant = require("./constant/runmode.constant");
const cors = require("cors")

//database connection with confirmation

mongoose.connect(dbConfig.URI,{
  serverSelectionTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;
db.on("error",()=>{
  console.log("Error while connecting to db")
})

db.once("open",()=>{
  console.log("connected to db")
  init();
})


//initialize with active admin if not present create one
async function init(){
    //   await service.insertMany([{
    //     name:"A"
    //   },{
    //     name:"B"
    //   },
    // {name:"C"},{name:"D"}])
    
    let services  = await service.find()
    
    
      let user = await admin.findOne({status:"ACTIVE"});
    
      if(!user){
        let adminUser = await admin.create({
          name:"admin",
          username:"admin",
          email:"admin@braincave.com",
          status:"ACTIVE",
          password:bcrypt.hashSync("admin",8)
        })
        console.log("admin created")
      }
      else{
        console.log("admin already present")
        // services.forEach(async (ele)=>{
        //   console.log(ele)
        //   // await admin.updateOne({username:admin},{$push:{service:ele._id}})
        // })
        // let adminUser = await admin.findOne({status:"ACTIVE"})
    
        // await services.updateMany({},{$push:{admin:adminUser._id}})
    
      }


      // checking if setting page exist if not create one
      let settingPage = await setting.findOne({})

      if(!settingPage){
        await setting.create({})
        console.log("empty setting page created")
      }else{
        console.log("setting page already exist")
      }
    }


    // add run mode
    async function addRunMode(modes){
      await RunMode.deleteMany({})
      for(i in modes){
        await RunMode.create({
          name:modes[i]
        })
      }
      console.log("all runMode added")
    }
    
    // addRunMode(runmodeConstant)


    app.use(bodyParser.urlencoded({extended: false}))

    app.use(bodyParser.json())

    app.use(cors());

    require("./routes/auth.route")(app)
    require("./routes/admin.route")(app)
    require("./routes/make.route")(app)
    require("./routes/model.route")(app)
    require("./routes/state.route")(app)
    require("./routes/country.route")(app)
    require("./routes/city.route")(app)
    require("./routes/vehicleType.route")(app)
    require("./routes/runMode.route")(app)
    require("./routes/individualFare.route")(app)
    require("./routes/rentalPackage.route")(app)
    require("./routes/rentalFare.route")(app)
    require('./routes/setting.route')(app)
    require('./routes/page.route')(app)
    require("./routes/rider.route")(app)
    require("./routes/driver.route")(app)
    require("./routes/vehicle.route")(app)
    require("./routes/booking.route")(app)
    require("./routes/fare.route")(app)
module.exports = app;