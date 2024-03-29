const settingController = require("../controller/settingPage.controller");

module.exports = function (app) {
  app.get("/test/api/v1/setting/", [], settingController.getSettingPage);
  app.put("/test/api/v1/setting/", [], settingController.updateSettingPage);

  app.get("/test/api/v1/settings", settingController.getSetting);
  app.put("/test/api/v1/settings", settingController.updateSetting);
};
