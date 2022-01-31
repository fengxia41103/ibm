const findOrCreate = require("mongoose-find-or-create");

module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    name: { type: String, unique: true },

    // persn can be assigned a group and/or color
    color: [{ type: mongoose.Schema.Types.ObjectId, ref: "color" }],
    group: [{ type: mongoose.Schema.Types.ObjectId, ref: "group" }],
  });

  schema.plugin(findOrCreate);

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
