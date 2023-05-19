const axios = require('axios');
const db = require("../models");
const Campaign = db.campaigns;
const CampaignGettingHistory = db.campaignGettingHistory;
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

exports.getCampaignFromTiktok = (req, res) => {
  CampaignGettingHistory.findOne({
    order: [
      ['date', 'DESC']
    ]
  })
    .then((data) => {
      let latest_date;
      if(data == null) {
        latest_date = '0000-00-00';
      } else {
        latest_date = data.date;
      }

      // get campaigns from tiktok
      try {
        axios.get(
          'https://ads.tiktok.com/open_api/v1.2/campaign/get',
          {
            params: {
              start_date: latest_date,
              advertiser_id: 10242341234,
              fields: 'campaign_id, campaign_name',
            },
            headers: {
              'Access-Token': '89a97d054966d74362288ef4b4933c2eb35502a5',
            },
          }
        )
          .then(res => {
            if(res.data) {
              res.data.map(item => {
                addCampaign(item)
              });
              
              CampaignGettingHistory.create({date: new Date(), addCount: res.data.length});
            }
            
            res.send({
              result: response.data
            });
          })
          .catch(err => {
            res.status(200).send({
              message: 'tiktok api error'
            })
          });
      } catch (error) {
        console.error(error);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message
      })
    })
}

const addCampaign = (data) => {
  const campaign = {
    campaignId: data.campaignId,
    campaignName: data.campaignName,
    //add fields
  }

  Campaign.create(campaign)
    .then(data => {
      return data;
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
}