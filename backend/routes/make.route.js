
const makeController = require("../controller/make.controller")

module.exports = function(app){
app.post("/test/api/v1/make/",[],makeController.addMake)
app.get("/test/api/v1/make/filter/",[],makeController.getMake)
app.get("/test/api/v1/make/",makeController.getall)
app.delete("/test/api/v1/make/:id",makeController.deleteMakeid)
app.put("/test/api/v1/make/update/:id",makeController.updateMakeData)
} 