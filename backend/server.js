const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  // origin: "http://localhost:3000",
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DAO application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/group.routes")(app);
require("./app/routes/color.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {});

// load initial data set if any
const initilize = async (file) => {
  const { group: Group, color: Color, user: User } = db;

  const initData = require(`./data/${file}`);
  for (const group in initData) {
    // const inGroup = await Group.findOrCreate({ name: group });
    let inGroup = await Group.findOne({ name: group });
    if (!inGroup) {
      inGroup = new Group({ name: group });
      await inGroup.save();
    }

    const subdoc = initData[group];

    for (const person in subdoc) {
      // create color
      const color = subdoc[person].toUpperCase();
      let inColor = await Color.findOne({ name: color });
      if (!inColor) {
        inColor = new Color({ name: color });
        await inColor.save();
      }

      // create new user
      let newUser = await User.findOne({ name: person });
      if (!newUser) {
        newUser = new User({
          name: person,
          color: inColor._id,
          group: inGroup._id,
        });
        await newUser.save();
      }
    }
  }
};
const fs = require("fs");
if (fs.existsSync("./data")) {
  const files = fs.readdirSync("./data");
  files.map((f) => initilize(f));
}
