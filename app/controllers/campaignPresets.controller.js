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

  req.body.presets.map((item, index) => {
    CampaignPresets.create(item)
      .then((preset) => {
      })
      .catch(err => {
        res.status(500).send({
          message: "Invaild Preset Error"
        });
      });
  });

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

function getAll() {
  CampaignPresets.findAll({
    order: [
      ['recId', 'ASC']
    ],
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return [];
    });
}