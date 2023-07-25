const app =  require("express")();
const admin = require("./model/admin.model")
const services = require("./model/services.model")
const dbConfig = require("./config/db.config")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const bcrypt = require("bcrypt")
const RunMode = require("./model/runMode.model")
const runmodeConstant = require("./constant/runmode.constant")

//database connection with confirmation

mongoose.connect(dbConfig.URI+dbConfig.db)
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
    
    let service  = await services.find()
    
    
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
        // service.forEach(async (ele)=>{
        //   console.log(ele)
        //   // await admin.updateOne({username:admin},{$push:{service:ele._id}})
        // })
        // let adminUser = await admin.findOne({status:"ACTIVE"})
    
        // await services.updateMany({},{$push:{admin:adminUser._id}})
    
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



    app.use(bodyparser.json())
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
module.exports = app;