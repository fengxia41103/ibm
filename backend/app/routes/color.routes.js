module.exports = (app) => {
  const colors = require("../controllers/color.controller.js");

  var router = require("express").Router();

  // Create a new Color
  router.post("/", colors.create);

  // Retrieve all Colors
  router.get("/", colors.findAll);

  // Retrieve a single Color with id
  router.get("/:id", colors.findOne);

  // Update a Color with id
  router.put("/:id", colors.update);

  // Delete a Color with id
  router.delete("/:id", colors.delete);

  // Delete all
  router.delete("/", colors.deleteAll);

  app.use("/api/colors", router);
};
