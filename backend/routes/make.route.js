
const makeController = require("../controller/make.controller")

module.exports = function(app){
app.post("/test/api/v1/make/",[],makeController.addMake)
app.get("/test/api/v1/make/filter/",[],makeController.getMake)
app.get("/test/api/v1/make/",makeController.getall)
} 