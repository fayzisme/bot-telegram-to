module.exports = app => {
  const orderitem = require("../controller/order_items.controller");

  var router = require("express").Router();

  // Create a new OrderItem
  router.post("/", orderitem.create);

  // Retrieve all OrderItems
  router.get("/", orderitem.findAll);

  // Retrieve a single OrderItem with id
  router.get("/:id", orderitem.findOne);

  // Update a OrderItem with id
  router.put("/:id", orderitem.update);

  // Delete a OrderItem with id
  router.delete("/:id", orderitem.delete);

  app.use('/api/orderitems', router);
};
