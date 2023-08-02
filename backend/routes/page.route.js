const pageController = require("../controller/page.controller")


module.exports = function(app){
    app.post("/test/api/v1/page/",[],pageController.addPage)
    app.get("/test/api/v1/page/",[],pageController.getAllPages)
    app.get("/test/api/v1/page/filter/",[],pageController.filterPage)
}