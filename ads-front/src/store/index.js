import { createStore, createLogger } from 'vuex'
import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'
import auth from "./modules/auth";
import advertiserAuth from './modules/advertiserAuth';


const savedLists = localStorage.getItem('gpttextlists')
const tmpLists = localStorage.getItem('usertextlists')
const FiniLists = localStorage.getItem('finitextlists')
const NowText = localStorage.getItem("nowtextstrings")
const ShowLoading = localStorage.getItem("showloading")
const ShowLoading2 = localStorage.getItem("showloading2")
const ShowLoading3 = localStorage.getItem("showloading3")


const state = {
  campaignList: [],
  campaignDetail: {
    id: 7128276846151483393,
    startDate: '2022-07-01',
    endDate: '2022-12-01',
    selectedColumns: [
      'date',
      'campaignName',
      'groupName',
      'adName',
      'cost',
      'costPerResult',
      'cpc',
      'impressions',
      'ctr',
      'clicks',
      'resultRate',
      'result',
      'cpa',
      'cvr',
      'conversions',
      // 'reach',
      'cpm',
      // 'frequency',
      'tag1',
    ],
    campaignHistory: [],
    chartData: [],
    filterCampaignNames: new Set(),
    filterGroupNames: new Set(),
  },
  campaignAdd: {
    campaigns: [],
    presets: [],
    selectedCampaigns: [],
    showPresetSelectable: false,
  },
  campaignGettingFlag: false,
  allowAdvertisers: [],
  advertiserId: null,
  accessToken: null,
    //modify
    lists:[
      {
        title: '製品、特徴の欄に入力し、sendボタンを押してください',
        cards: [{ body: 'English' }, { body: 'Mathematics' }],
      },
    ],
    tmp:[],
    finished:[],
  //      nowtext:"",
     showloading: false,
     showloading2: false,
     showloading3: false,
  nowtext: NowText ? JSON.parse(NowText) : "",
}

export default createStore({
  state,
  getters,
  actions,
  mutations,
  modules: {
    auth,
    advertiserAuth
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
})
