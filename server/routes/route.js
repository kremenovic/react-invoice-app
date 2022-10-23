const routes = require("express").Router(); // allows to create different route
const controller = require("../controller/controller");

routes
  .route("/api/invoices")
  .post(controller.create_Invoices)
  .get(controller.get_Invoice)
  .delete(controller.delete_Invoice)
  .put(controller.update_Status);

routes
  .route("/api/invoices/:id")
  .get(controller.get_SingleInvoice)
  .put(controller.update_Invoice);

routes.route("/api/register").post(controller.create_User);
routes.route("/api/login").post(controller.login_User);

routes.route("/api/user").post(controller.login_User).get(controller.get_User);

module.exports = routes;
