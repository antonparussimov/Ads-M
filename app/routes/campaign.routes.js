module.exports = app => {
  const campaigns = require("../controllers/campaign.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.get('/', campaigns.findAll);

  // Find a campaign data with id
  router.get('/detail/:id', campaigns.findOne)

  app.use("/api/campaigns", router);
}