const db = require("../models");
const CampaignPresets = db.campaignsPresets;
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;

// Retrieve all campaignsPresets
exports.findAll = (req, res) => {
  CampaignPresets.findAll({
    order: [
      ['recId', 'ASC']
    ],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving campaignsPesets",
      });
    });
};

// Create and Save a new Presets
exports.create = (req, res) => {
  // Validate request
  if (!req.body.presets) {
    res.status(400).json({
      message: "Content can not be empty!"
    });
    return;
  }

  let rlt = [];
  req.body.presets.map((item, index) => {
    CampaignPresets.create(item)
      .then(data => {
        rlt.push(data);
      })
      .catch(err => {
        res.status(500).json({
          message: "Invaild Preset Error"
        })
        return;
      });
  });
  res.json({
    data: rlt
  });
};