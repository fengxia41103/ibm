const findOrCreate = require("mongoose-find-or-create");

module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    name: { type: String, unique: true },
  });

  schema.plugin(findOrCreate);

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Group = mongoose.model("group", schema);
  return Group;
};
