module.exports = app => {
  const campaigns = require("../controllers/campaign.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.post('/', campaigns.findAll);

  // Find a campaign data with id
  router.post('/detail', campaigns.findOne)

  router.get('/get_campaign_from_tiktok', campaigns.getCampaignFromTiktok)

  app.use("/api/campaigns", router);
}