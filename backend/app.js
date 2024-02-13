const express = require("express");
const app = express();
const { admin, service, setting } = require("./model/index");
const dbConfig = require("./config/db.config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const RunMode = require("./model/runMode.model");
const dbs = require("./model/index");
const runmodeConstant = require("./constant/runmode.constant");
const cors = require("cors");
const { ErrorHandler } = require("./middleware/errorHandler");
const path = require("path");

//database connection with confirmation

mongoose.connect(dbConfig.URI, {
  serverSelectionTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
  console.log("Error while connecting to db");
});
db.once("open", () => {
  console.log("connected to db");
  init();
});

app.use(express.static(path.join(__dirname, "uploads")));
//initialize with active admin if not present create one
async function init() {
  //   await service.insertMany([{
  //     name:"A"
  //   },{
  //     name:"B"
  //   },
  // {name:"C"},{name:"D"}])

  let services = await service.find();

  let user = await admin.findOne({ status: "ACTIVE", role: "superadmin" });

  if (!user) {
    let adminUser = await admin.create({
      name: "admin",
      username: "admin",
      email: "admin@braincave.com",
      status: "ACTIVE",
      role: "superadmin",
      permissions: ["All"],
      password: bcrypt.hashSync("admin", 8),
    });
    console.log("admin created");
  } else {
    console.log("admin already present");
    // services.forEach(async (ele)=>{
    //   console.log(ele)
    //   // await admin.updateOne({username:admin},{$push:{service:ele._id}})
    // })
    // let adminUser = await admin.findOne({status:"ACTIVE"})

    // await services.updateMany({},{$push:{admin:adminUser._id}})
  }

  // checking if setting page exist if not create one
  let settingPage = await setting.findOne({});

  if (!settingPage) {
    await setting.create({});
    console.log("empty setting page created");
  } else {
    console.log("setting page already exist");
  }
}

// add run mode
async function addRunMode(modes) {
  for (i in modes) {
    let runmode = await RunMode.findOne({ name: modes[i] });
    if (!runmode) {
      console.log(`run mode ${modes[i]} added`);
      await RunMode.create({
        name: modes[i],
      });
    }
  }
}

addRunMode(runmodeConstant);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

require("./routes/auth.route")(app);
require("./routes/admin.route")(app);
require("./routes/make.route")(app);
require("./routes/model.route")(app);
require("./routes/state.route")(app);
require("./routes/country.route")(app);
require("./routes/city.route")(app);
require("./routes/vehicleType.route")(app);
require("./routes/runMode.route")(app);
require("./routes/individualFare.route")(app);
require("./routes/rentalPackage.route")(app);
require("./routes/rentalFare.route")(app);
require("./routes/setting.route")(app);
require("./routes/page.route")(app);
require("./routes/rider.route")(app);
require("./routes/driver.route")(app);
require("./routes/vehicle.route")(app);
require("./routes/booking.route")(app);
require("./routes/fare.route")(app);
require("./routes/transaction.route")(app);
require("./routes/template.route")(app);
require("./routes/promotion.route")(app);
require("./routes/referral.route")(app);
require("./routes/toll.route")(app);
require("./routes/tax.route")(app);
require("./routes/sos.route")(app);
require("./routes/avaialibilityManagement.route")(app);
require("./routes/vehicleCategory.route")(app);
require("./routes/fares.route")(app);
require("./routes/package.route")(app);
require("./routes/tolls.route.js")(app);
require("./routes/manufacturer.route")(app);
require("./routes/rentalFares.route.js")(app);
require("./routes/emailTemplate.route.js")(app);
require("./routes/SOSs.route.js")(app);
require("./routes/riders.route.js")(app);
require("./routes/promoCode.route.js")(app);
require("./routes/rentalPromotion.route.js")(app);
require("./routes/notification/rider.route.js")(app);
require("./routes/driverPayoutManagement.route.js")(app);
app.use(ErrorHandler);

module.exports = app;

// let run = async function(){
//   let ids = ["64d342c47d3ab1450de36bc5","64ccdc27f0017bf9ab25b717","64ccdbe4f0017bf9ab25b70b","64ccdb99f0017bf9ab25b6ff","64ccce80f245cd6e07259093"]

//   ids.map(async function (id){
//     let wallet = await dbs.wallet.create({user:id})

//     await dbs.driver.findOneAndUpdate({_id:id},{wallet:wallet._id})
//     console.log("created wallet",wallet)
//   })

// }

// run()

//update in one driver

// async function updateone (){
//   await dbs.driver.findOneAndUpdate({_id:"64ccdb99f0017bf9ab25b6ff"},{
//     "aadhar.verified":true,
//     "aadhar.verifiedBy":"64ab92e5b0898738707c7718",
//     "pan.verified":true,
//     "pan.verifiedBy":"64ab92e5b0898738707c7718",
//     verified:true,
//     verifiedBy:"64ab92e5b0898738707c7718"
//   })
// }

// updateone()
