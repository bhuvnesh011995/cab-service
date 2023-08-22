const walletController = require("../controller/wallet.controller")





module.exports = function (app){
    app.get("/test/api/v1/wallet/:user",[],walletController.getWalletBalance)
    app.put("/test/api/v1/wallet/:user",[],walletController.updateBalance)
    app.get("/test/api/v1/wallet",[],walletController.getalluser)
}