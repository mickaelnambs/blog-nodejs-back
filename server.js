const express = require("express");
const bodyParser = require("body-parser");
const db = require("./app/models");
const Role = db.role;
const cors = require("cors");

const app = express();

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

require("./app/routes/category.routes.js")(app);
require("./app/routes/article.routes.js")(app);
require("./app/routes/comment.routes.js")(app);
require("./app/routes/upload.routes.js")(app);
require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
