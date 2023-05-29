const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  // origin: "http://localhost:"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync() //{ force: true }  >>>> drop the table if it already exists
  .then(() => {
    console.log("Synced db.");
    // seeder
    const campaignSeeder = require('./app/seeder/campaign.seeder');
    campaignSeeder();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({message: `Server running on port ${PORT}`})
});

require("./app/routes/campaign.routes")(app);
require("./app/routes/campaignPresets.routes")(app);
app.use("/api/user", require('./app/routes/users'));
app.use("/api/auth", require('./app/routes/auth'));

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
