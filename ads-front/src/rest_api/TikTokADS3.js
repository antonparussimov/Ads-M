import axios from 'axios'

export default class TikTokADS3 {
  constructor(op) {
    this.ACCESS_TOKEN = op['ACCESS_TOKEN']
    this.getStat = op['getStat']
    this.advertiser_id = op['advertiser_id']
    this.campaign_name = op['campaign_name']
    this.campaign_type = op['campaign_type']
    this.budget_mode = op['budget_mode']
    this.budget = op['budget']
    this.start_time = op['start_time']
    this.end_time = op['end_time']
    this.optimization_goal = op['optimization_goal']
    this.billing_event = op['billing_event']
    this.bid = op['bid']
    this.app_id = op['app_id']
    this.adgroup_list = op['adgroup_list']
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
    try {
      const response = axios.post(
        'https://ads.tiktok.com/open_api/v1.2/campaign/create',
        {
          campaign_name: this.campaign_name,
          campaign_type: this.campaign_type,
          budget_mode: this.budget_mode,
          budget: this.budget,
          start_time: this.start_time,
          end_time: this.end_time,
          optimization_goal: this.optimization_goal,
          billing_event: this.billing_event,
          bid: this.bid,
          app_id: this.app_id,
          adgroup_list: [
            {
              adgroup_name: 'My Ad Group',
              bid: 1,
              budget_mode: 'BUDGET_MODE_DAY',
              budget: 50,
              start_time: '2023-06-01 00:00:00',
              end_time: '2023-06-30 23:59:59',
              optimization_goal: 'APP_INSTALL',
              billing_event: 'BILLING_EVENT_APP_INSTALL',
              creative_list: [
                {
                  creative_id: '1234567890',
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Token': this.ACCESS_TOKEN,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}
