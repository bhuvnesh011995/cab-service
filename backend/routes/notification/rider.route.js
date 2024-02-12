const riderNotificationController = require("../../controller/notification/rider.controller");
module.exports = (app) => {
  app.post(
    "/test/api/v1/notification/rider/",
    riderNotificationController.addRiderNotification
  );
  app.get(
    "/test/api/v1/notification/rider/filter",
    riderNotificationController.filterRiderNotification
  );
  app.put(
    "/test/api/v1/notification/rider/:id",
    riderNotificationController.updateRiderNotification
  );

  app.delete(
    "/test/api/v1/notification/rider/:id",
    riderNotificationController.deleteRiderNotification
  );
};
