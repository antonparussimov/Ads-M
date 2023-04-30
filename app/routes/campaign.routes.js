module.exports = app => {
  const campaigns = require("../controllers/campaign.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.post('/', campaigns.findAll);

  // Find a campaign data with id
  router.post('/detail', campaigns.findOne)

  app.use("/api/campaigns", router);
}