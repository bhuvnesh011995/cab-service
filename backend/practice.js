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

mongoose.connect("mongodb://0.0.0.0/practice")

const db = mongoose.connection
db.on("error",()=>console.log("error while connection"))
db.once("open",()=>console.log("connectied to db"))

const schema = new Schema({
  file:{
    data:Buffer,
    contentType:String
  },
  name:String
},{
  collection:"NEW"
})

let NEW = model("NEW",schema)



const multer = require("multer")

const express = require("express");
const bodyParser = require("body-parser")

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(8081,()=>console.log("connection started"))

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"upload")
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname)
  }
})

const upload = multer({storage:storage})

app.get("/",async (req,res)=>{
 const data = await NEW.findOne({})
 res.json(data.file.data)
})

app.post("/",upload.single("image"),async (req,res,next)=>{
  const data = req.file.buffer;
  const base64data = data.toString("base64");
  let obj = {
    file:{
      data:base64data,
      contentType: req.file.mimetype
    },
    name:req.file.orignalname
  }
 const img =  await NEW.create(obj)

 res.status(200).json({
  success:true,
  data:img
 })
})

