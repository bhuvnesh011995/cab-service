const walletController = require("../controller/transaction.controller")
const middleware = require("../middleware/index")




module.exports = function (app){
    app.get("/test/api/v1/wallet/:userType/:userId",[middleware.validateId.validateUserId],walletController.getWalletBalance)
    app.put("/test/api/v1/wallet/:userType/:userId",[middleware.validateId.validateUserId],walletController.updateBalance)
}