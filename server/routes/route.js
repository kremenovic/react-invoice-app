const routes = require("express").Router(); // allows to create different route
const controller = require("../controller/controller");

routes
  .route("/api/invoice")
  .post(controller.create_Invoices)
  .get(controller.get_Invoice)
  .delete(controller.delete_Invoice);

routes.route("/api/register").post(controller.create_User);
routes.route("/api/login").post(controller.login_User);

module.exports = routes;
