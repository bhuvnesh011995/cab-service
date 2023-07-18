const adminController = require('../controller/admin.controller')



module.exports = function(app){
app.get("/test/api/v1/admin/filter/",adminController.filter)
app.delete("/test/api/v1/admin/:userrname",adminController.deleteAdmin)
}