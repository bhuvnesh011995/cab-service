const modelController = require("../controller/model.controller")



module.exports = function(app){
    app.post("/test/api/v1/model/",[],modelController.addModel)
    app.get("/test/api/v1/model/filter/",[],modelController.filterModel)
    app.delete("/test/api/v1/model/:id",[],modelController.deleteModel)
}