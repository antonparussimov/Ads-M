export default class TikTokADS3 {
  constructor(op) {
    this.ACCESS_TOKEN = op['ACCESS_TOKEN']
    this.getStat = op['getStat']
    this.advertiser_id = op['advertiser_id']
  }

  createGroup(campaign_id) {
    this.PATH = 'https://ads.tiktok.com/open_api/v1.2/adgroup/create/'
    let option = {
      advertiser_id: this.advertiser_id,
      campaign_id: campaign_id,
      adgroup_name: 'testtest',
      placement_type: 'PLACEMENT_TYPE_NORMAL',
      placement: ['PLACEMENT_TIKTOK'],
      location: [1861060], //Japan
      budget_mode: 'BUDGET_MODE_DAY',
      budget: 1000,
      schedule_type: 'SCHEDULE_START_END',
      schedule_end_time: '2023-01-01 00:00:00',
      schedule_start_time: '2022-08-01 00:00:00',
      optimize_goal: 'REACH',
      pacing: 'PACING_MODE_SMOOTH',
      billing_event: 'CPM',
      bid_type: 'BID_TYPE_NO_BID',
      frequency: 2,
      frequency_schedule: 3,
    }

    let params = ''
    for (let key in option) {
      params += key + '=' + option[key] + '&'
    }

    let url = encodeURI(this.PATH + '?' + params)
    console.log(url)
    /*const httpResponse = UrlFetchApp.fetch(url, {
      method: 'post',
      headers: {
        'Access-Token': this.ACCESS_TOKEN,
      },
    })
    .getContentText();
    //console.log(httpResponse)
    let res = JSON.parse(httpResponse)*/
    return res
  }
  
  createCampaign() {
    this.PATH = 'https://ads.tiktok.com/open_api/v1.2/campaign/create/'
    let option = {
      advertiser_id: this.advertiser_id,
      budget_mode: 'BUDGET_MODE_DAY',
      budget: 10000,
      objective_type: 'REACH',
      campaign_name: 'test1aa',
    }

    let params = ''
    for (let key in option) {
      params += key + '=' + option[key] + '&'
    }
    //console.log(params)
    let url = encodeURI(this.PATH + '?' + params)

    const httpResponse = UrlFetchApp.fetch(url, {
      method: 'post',
      headers: {
        'Access-Token': this.ACCESS_TOKEN,
      },
    }).getContentText()
    //console.log(httpResponse)
    let res = JSON.parse(httpResponse)
    return res
  }
}
