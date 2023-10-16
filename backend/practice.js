// // const statofday = require("date-fns/startOfDay")
// // const endofday = require("date-fns/endOfDay")



// // console.log(statofday(new Date(2012,7,14)))
// // console.log(endofday(new Date(2012,7,14)))

// let states = [
//     { name: 'rajasthan' },
//     { name: 'west bangal' },
//     { name: 'gujrat' },
//     {
//       name: 'maharastra',
//       country: {  name: 'india' }
//     },
//     {
//       name: 'panjab',
//       country: { name: 'pakistan' }
//     }
//   ]
//   let stateList = [];
//   let count = 0;
//   for(i=0;i<states.length;i++){
      
//       stateList.push({name:states[i].name})
//       if(states[i].country){
//           while(count<=i){
//               stateList[count].country=states[i].country.name;
//               count++
//           }
//       }
//   }
  
//   console.log(stateList)

const mongoose = require("mongoose")
const {Schema,model} = mongoose;

mongoose.connect("mongodb://localhost:27017/practice")

const db = mongoose.connection
db.on("error",()=>console.log("error while connection"))
db.once("open",()=>console.log("connectied to db"))

// const schema = new Schema({
//   file:{
//     data:Buffer,
//     contentType:String
//   },
//   name:String
// },{
//   collection:"NEW"
// })

// let NEW = model("NEW",schema)



// const multer = require("multer")

const express = require("express");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(8081,()=>console.log("connection started"))

// const storage = multer.diskStorage({
//   destination:(req,file,cb)=>{
//     cb(null,"upload")
//   },
//   filename:(req,file,cb)=>{
//     cb(null,Date.now()+"-"+file.originalname)
//   }
// })

// const upload = multer({storage:storage})

// app.get("/",async (req,res)=>{
//  const data = await NEW.findOne({})
//  res.json(data.file.data)
// })

// app.post("/",upload.single("image"),async (req,res,next)=>{
//   const data = req.file.buffer;
//   const base64data = data.toString("base64");
//   let obj = {
//     file:{
//       data:base64data,
//       contentType: req.file.mimetype
//     },
//     name:req.file.orignalname
//   }
//  const img =  await NEW.create(obj)

//  res.status(200).json({
//   success:true,
//   data:img
//  })
// })



// const sch1 = new Schema({
//   data:{type:Date,default:Date.now},
//   name:String,
//   name2:String,
//   name3:String,
//   linkType:String
// },{collection:"Sch1"})

// const Sch1 = model("Sch1",sch1)

// const sch2 = new Schema({
//   value1:String
// },{collection:"Sch2"})

// const Sch2 = Sch1.discriminator("Sch2",sch2)

// const sch3 = new Schema({
//   value2:String
// },{collection:"Sch3"})

// const Sch3 = Sch1.discriminator("Sch3",sch3)

// async function init (){
//   await Sch1.create({
//     name:"ram",
//     name2:"kjjsdajf",
//     name3:"hjsafkdsa",
//   })
//   console.log("data added")
// }

// init();

// async function findOne(){
//   let data = await Sch1.find({value1:"ram"})
//   console.log(data)
// }

// // findOne();

// async function find(){
//   let data = await Sch1.find({}).select({"name":-1,"name2":1})
//   console.log(data)
// }

// find()


// let numberTestSch = new Schema({
//   value:Number
// },{
//   collection:'number'
// })

// number = model('number',numberTestSch)


// async function save(){
//   let value = await number.create({
//     value:5.64
//   })

//   console.log("doc is", value)
// }

// save()




