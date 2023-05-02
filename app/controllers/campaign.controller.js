const db = require("../models");
const Campaign = db.campaigns;
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;

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

  const result = {}
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
      result.campaignHistory = data;
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving campaigns",
      });
    });
  
  Campaign.findAll({
    attributes: [
      'date',
      [Sequelize.fn('SUM', Sequelize.col('cost')), 'cost'],
    ],
    where: {
      campaignId: id,
      date: {
        [Op.lt]: new Date(endDate),
        [Op.gt]: new Date(startDate),
      },
    },
    order: [
      ['date', 'ASC']
    ],
    group: 'date'
  })
    .then((data) => {
      result.chartData = data;
      res.json(result)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message
      })
    })
};
