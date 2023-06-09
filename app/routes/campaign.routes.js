module.exports = app => {
  const campaigns = require("../controllers/campaign.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.post('/', campaigns.findAll);

  // Find a campaign data with id
  router.post('/detail', campaigns.findOne)

  router.get('/get_campaign_from_tiktok', campaigns.getCampaignFromTiktok)
  router.post('/get_campaign_from_csv', campaigns.getCampaignFromCsv)
  
  router.post('/add_campaign_to_tiktok', campaigns.addCampaignToTiktok)

  app.use("/api/campaigns", router);
}