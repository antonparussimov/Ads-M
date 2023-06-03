const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const Campaign = db.campaigns
const CampaignGettingHistory = db.campaignGettingHistory
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

// Retrieve all campaigns
exports.findAll = (req, res) => {
  Campaign.findAll({
    order: [['recId', 'ASC']],
    // group: "campaignId",
  })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving campaigns',
      })
    })
}

// Find a campaign data with id
exports.findOne = (req, res) => {
  const id = req.body.id
  const startDate = req.body.startDate
  const endDate = req.body.endDate
  let filterNames = req.body.filterNames
  const result = {}
  let where = {}
  if (filterNames[0] != undefined) {
    where = {
      // adId: id,
      campaignName: {
        [Op.in]: filterNames,
      },
      date: {
        [Op.lt]: new Date(endDate),
        [Op.gt]: new Date(startDate),
      },
    }
  } else {
    where = {
      // adId: id,
      date: {
        [Op.lt]: new Date(endDate),
        [Op.gt]: new Date(startDate),
      },
    }
  }

  Campaign.findAll({
    where: where,
  })
    .then((data) => {
      result.campaignHistory = data

      Campaign.findAll({
        attributes: ['date', [Sequelize.fn('SUM', Sequelize.col('cost')), 'cost']],
        where: where,
        order: [['date', 'ASC']],
        group: 'date',
      })
        .then((data) => {
          result.chartData = data
          res.json(result)
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          })
        })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving campaigns',
      })
    })
}

async function getCampaignPerDay(curDate) {
  console.log('call getCampaignPerDay function>>', curDate)
  let stat = [
    'campaign_id',
    'campaign_name',
    'adgroup_id',
    'adgroup_name',
    'adgroup_id',
    'ad_id',
    'ad_name',
    'ad_text',
    'stat_cost',
    'show_cnt',
    'click_cnt',
    'convert_cnt',
    'time_attr_view',
    'play_duration_2s',
    'play_duration_6s',
    'play_over',
    'ad_like',
  ]
  let option = {
    //primary_status      : 'STATUS_ALL',
    start_date: curDate,
    end_date: curDate,
    advertiser_id: '7128276846151483393',
    fields: JSON.stringify(stat),
    group_by: JSON.stringify(['STAT_GROUP_BY_FIELD_STAT_TIME', 'STAT_GROUP_BY_FIELD_ID']),
    time_granularity: 'STAT_TIME_GRANULARITY_DAILY', //'STAT_TIME_GRANULARITY_HOURLY'
    page: 1,
    page_size: 1000,
  }
  let params = ''
  for (let key in option) {
    params += key + '=' + option[key] + '&'
  }
  let url = encodeURI('https://ads.tiktok.com/open_api/v1.2/reports/ad/get/' + '?' + params)

  await axios
    .get(url, {
      headers: {
        'Access-Token': 'e703d9339371aeb0144d9451123a94a3482c1e18',
      },
    })
    .then((res) => {
      let addedCount = 0
      if (res.data.data.list[0] != undefined) {
        // console.log(res.data.data.list);
        Promise.all(
          res.data.data.list.map((item) => {
            addCampaign(item)
          })
        )
          .then(() => {
            addedCount = res.data.data.list.length
            CampaignGettingHistory.create({ date: curDate, addCount: res.data.length })
              .then(() => {
                console.log(curDate, '>> add campaigns of ', res.data.data.list.length)
                return addedCount
              })
              .catch(() => {
                return false
              })
          })
          .catch((err) => {
            return false
          })
      }
    })
    .catch((err) => {
      return false
    })
}

exports.getCampaignFromTiktok = async (req, res) => {
  try {
    let latest_date = await CampaignGettingHistory.findOne({
      order: [['date', 'DESC']],
    })

    if (!latest_date) {
      latest_date = '2022-08-01'
    } else {
      latest_date = latest_date.date
    }
    const now = new Date()
    let yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    let start_date = new Date(latest_date)
    start_date.setDate(start_date.getDate() + 1)
    for (let date = start_date; date <= yesterday; date.setDate(date.getDate() + 1)) {
      await getCampaignPerDay(format(date, 'yyyy-MM-dd'))
    }

    res.send({
      message: 'success',
    })
  } catch (error) {
    res.status(500).json({
      message: err.message,
    })
  }
}

exports.addCampaignToTiktok = (req, res) => {
  const campaigns = req.body.campaigns
  console.log(campaigns[0])
  if (campaigns[0] != undefined) {
    campaigns.map((item) => {
      axios
        .post(
          'https://ads.tiktok.com/open_api/v1.2/campaign/create/',
          {
            advertiser_id: '7128276846151483393',
            budget_mode: item.cell7,
            budget: item.cell8,
            objective_type: item.cell10,
            campaign_name: item.cell5,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Token': this.ACCESS_TOKEN,
            },
          }
        )
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  res.send({
    message: 'success',
  })
}

const addCampaign = (data) => {
  const campaign = {
    campaignId: data.campaign_id,
    campaignName: data.campaign_name,
    adId: data.ad_id,
    groupName: data.adgroup_name,
    campaignGroupId: data.adgroup_id,
    adName: data.ad_name,
    clicks: data.click_cnt,
    viewsSec: data.play_duration_2s,
    viewsFull: data.play_over,
    date: data.stat_datetime,
    cv: data.convert_cnt,
    cost: data.stat_cost,
    views: data.show_cnt,
    likes: data.ad_like,
  }

  Campaign.create(campaign)
    .then((data) => {
      return data
    })
    .catch((err) => {
      return err
    })
}
