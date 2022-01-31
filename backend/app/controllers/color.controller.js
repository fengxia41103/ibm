const db = require("../models");
const Color = db.color;

// Create and Save a new Color
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Color
  const color = new Color({
    name: req.body.name,
  });

  // Save Color in the database
  color
    .save(color)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Color.",
      });
    });
};

// Retrieve all Colors from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Color.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving colors.",
      });
    });
};

// Find a single Color with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Color.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Color with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Color with id=" + id });
    });
};

// Update a Color by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Color.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Color with id=${id}. Maybe Color was not found!`,
        });
      } else res.send({ message: "Color was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Color with id=" + id,
      });
    });
};

// Delete a Color with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Color.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Color with id=${id}. Maybe Color was not found!`,
        });
      } else {
        res.send({
          message: "Color was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Color with id=" + id,
      });
    });
};

// Delete all Colors from the database.
exports.deleteAll = (req, res) => {
  Color.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Colors were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all colors.",
      });
    });
};
