const sosController = require("../controller/SOS.controller")



module.exports = function(app){
    app.post('/test/api/v1/sos/',[],sosController.addSos)
    app.get("/test/api/v1/sos/filter",[],sosController.filterSos)
}