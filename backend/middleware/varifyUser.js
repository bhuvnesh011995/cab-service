const admin = require("../model/admin.model")

let bcrypt = require("bcrypt") 


let varifyUser = async function(req,res,next){
    let username = req.params.username;

    const {password} = req.body

//    try{ 
    let userDetails = await admin.findOne({
        username: username,
      });
      console.log(userDetails)
      console.log(password) 
        let isValid = bcrypt.compareSync(password,userDetails.password)

        if(!isValid) res.status(404).json({
            success:false,
            message: "invalid username or password"
        }).end();
        else{
            req.body.id = userDetails._id
        next()
        }
        


    // }catch(err){
    //     res.status(500).json({
    //         success:false,
    //         message:"some err 1 happen"
    //     }).end()
    // }
}

module.exports = {
    varifyUser
}