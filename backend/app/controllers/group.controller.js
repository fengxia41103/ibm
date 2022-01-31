const db = require("../models");
const Group = db.group;

// Create and Save a new Group
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Group
  const group = new Group({
    name: req.body.name,
  });

  // Save Group in the database
  group
    .save(group)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Group.",
      });
    });
};

// Retrieve all Groups from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Group.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving groups.",
      });
    });
};

// Find a single Group with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Group.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Group with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Group with id=" + id });
    });
};

// Update a Group by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Group.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Group with id=${id}. Maybe Group was not found!`,
        });
      } else res.send({ message: "Group was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Group with id=" + id,
      });
    });
};

// Delete a Group with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Group.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Group with id=${id}. Maybe Group was not found!`,
        });
      } else {
        res.send({
          message: "Group was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Group with id=" + id,
      });
    });
};

// Delete all Groups from the database.
exports.deleteAll = (req, res) => {
  Group.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Groups were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all groups.",
      });
    });
};
