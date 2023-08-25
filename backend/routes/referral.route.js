const referralController = require("../controller/referral.controller")


module.exports = function(app){
    app.post("/test/api/v1/referral/",[],referralController.addReferral)
    app.get("/test/api/v1/referral/filter/",[],referralController.filterReferal)
}