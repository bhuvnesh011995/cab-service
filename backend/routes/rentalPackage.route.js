const rentalPackageController = require("../controller/renalPackage.controller")



module.exports = function(app){
    app.post("/test/api/v1/rentalPackage/",[],rentalPackageController.addPackage)
    app.get("/test/api/v1/rentalPackage/",[],rentalPackageController.getAllPackage)
    app.get("/test/api/v1/rentalPackage/filter/",[],rentalPackageController.filterPackage)
    app.delete("/test/api/v1/rentalPackage/:id",[],rentalPackageController.deleteRenalPackage)

}