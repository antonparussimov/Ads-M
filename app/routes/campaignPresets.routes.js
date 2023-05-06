module.exports = app => {
  const campaignsPresets = require("../controllers/campaignPresets.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.get('/', campaignsPresets.findAll);

  // Find a campaign data with id
  router.post('/add_preset', campaignsPresets.create)

  app.use("/api/presets", router);
}