const db = require("../models");
const Campaign = db.campaigns;
const Op = db.Sequelize.Op;

// Retrieve all campaigns
exports.findAll = (req, res) => {
  const page = req.body.page;
  const itemsPerPage = req.body.itemsPerPage;
  const sortBy = req.body.sortBy;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  Campaign.findAll({
    where: {
      date: {
        [Op.lt]: new Date(endDate),
        [Op.gt]: new Date(startDate),
      },
    },
    limit: itemsPerPage,
    offset: (page - 1) * itemsPerPage,
    order: sortBy,
    group: ["recId", "campaignId"],
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
  const id = req.params.id;
  const page = req.body.page;
  const itemsPerPage = req.body.itemsPerPage;
  const sortBy = req.body.sortBy;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  Campaign.findAll({
    where: {
      campaignId: id,
      date: {
        [Op.lt]: new Date(endDate),
        [Op.gt]: new Date(startDate),
      },
    },
    limit: itemsPerPage,
    offset: (page - 1) * itemsPerPage,
    order: sortBy,
    group: ["recId", "campaignId"],
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
