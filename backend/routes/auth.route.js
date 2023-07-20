const userController = require("../controller/user.controller")
const { varifyUser } = require("../middleware/varifyUser")



module.exports = function(app){
    app.post("/test/api/v1/auth/signIn/",userController.signIn)
    app.post("/test/api/v1/auth/signUp/",userController.signUp)
    app.post("/test/api/v1/auth/reset/:username",[varifyUser],userController.changePass)
}