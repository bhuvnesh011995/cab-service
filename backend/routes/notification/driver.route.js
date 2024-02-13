const driverNotificationController = require("../../controller/notification/driver.controller");
module.exports = (app) => {
  app.post(
    "/test/api/v1/notification/driver/",
    driverNotificationController.addDriverNotification
  );
  app.get(
    "/test/api/v1/notification/driver/filter",
    driverNotificationController.filterDriverNotification
  );
  app.put(
    "/test/api/v1/notification/driver/:id",
    driverNotificationController.updateDriverNotification
  );

  app.delete(
    "/test/api/v1/notification/driver/:id",
    driverNotificationController.deleteDriverNotification
  );
};
