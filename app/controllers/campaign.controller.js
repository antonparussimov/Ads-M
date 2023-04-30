const db = require("../models");
const Campaign = db.campaigns;
const Op = db.Sequelize.Op;

// Retrieve all campaigns
exports.findAll = (req, res) => {
  Campaign.findAll({
    order: [
      ['recId', 'ASC']
    ],
    // group: "campaignId",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving campaigns",
      });
    });
};

// Find a campaign data with id
exports.findOne = (req, res) => {
  const id = req.body.id;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  Campaign.findAll({
    where: {
      campaignId: id,
      date: {
        [Op.lt]: new Date(endDate),
        [Op.gt]: new Date(startDate),
      },
    }
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving campaigns",
      });
    });
};
