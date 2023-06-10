import * as types from './types'
import axios from 'axios'



export default {
  getCampaignDetail(state, payload) {
    state.campaignDetail.campaignHistory = payload.campaignHistory || []
    state.campaignDetail.chartData = payload.chartData
  },

  getCampaigns(state, payload) {
    state.campaignList = payload
  },

  updateSelectedColumn(state, payload) {
    state.campaignDetail.selectedColumns = payload
  },

  updateStartDate(state, payload) {
    state.campaignDetail.startDate = payload
  },

  updateEndDate(state, payload) {
    state.campaignDetail.endDate = payload
  },

  updateFilterRanges(state, payload) {
    state.campaignDetail.startDate = payload[0]
    state.campaignDetail.endDate = payload[1]
  },

  [types.CREATE_NEW_CAMPAIGN](state, payload) {
    state.campaignAdd.campaigns = [...state.campaignAdd.campaigns, payload]
  },

  [types.CHANGE_NEW_CAMPAIGN_ATTR](state, payload) {
    state.campaignAdd.campaigns[payload.index][payload.key] = payload.value
  },

  [types.ChANGE_NEW_SELECTABLE](state, payload) {
    state.campaignAdd.selectedCampaigns = payload
  },

  [types.REVERSE_PRESET_SELECTABLE](state) {
    state.campaignAdd.showPresetSelectable = !state.campaignAdd.showPresetSelectable
  },

  [types.ADD_NEW_PRESET](state, payload) {
    state.campaignAdd.presets = payload
  },

  [types.CHANGE_NEW_CAMPAIGN_TITLE](state, payload) {
    state.campaignAdd.campaigns[payload.index].title = payload.title
  },

  [types.GET_PRESETS](state, payload) {
    state.campaignAdd.presets = payload
  },

  [types.ADD_NEW_CAMPAIGN_FROM_PRESET](state, payload) {
    let ret = Object.entries(state.campaignAdd.presets[payload])

    ret = ret.filter(([key, value]) => key.includes('cell') || key == 'title')
    ret = Object.fromEntries(ret)
    state.campaignAdd.campaigns = [...state.campaignAdd.campaigns, ret]
  },

  [types.GET_CAPAIGN_FROM_TIKTOK](state) {
    state.campaignGettingFlag = true
  },

  [types.GETED_CAPAIGN_FROM_TIKTOK](state) {
    state.campaignGettingFlag = false
  },

  [types.GET_CAMPAIGN_FROM_CSV](state) {
    state.campaignGettingFlag = true
  },

  [types.GETED_CAMPAIGN_FROM_CSV](state) {
    state.campaignGettingFlag = false
  },


  [types.ADD_CAMPAIGN_TO_TIKTOK](state) {
    state.campaignAdd.campaigns = []
  },

  [types.ADD_FILTER_CAMPAIGN_NAME](state, payload) {
    state.campaignDetail.filterCampaignNames.add(payload)
  },

  [types.REMOVE_FILTER_CAMPAIGN_NAME](state, payload) {
    state.campaignDetail.filterCampaignNames.delete(payload)
  },

  [types.ADD_FILTER_GROUP_NAME](state, payload) {
    state.campaignDetail.filterGroupNames.add(payload)
  },

  [types.REMOVE_FILTER_GROUP_NAME](state, payload) {
    state.campaignDetail.filterGroupNames.delete(payload)
  },

  getAllowAdvertisers (state, payload) {
    state.allowAdvertisers = payload
  },

  removeToken(state) {
    localStorage.removeItem('token')
    state.auth.Auth = false
    state.auth.user = {}
    state.auth.token = null
  },

  setAdvertiser(state, payload) {
    state.advertiserId = payload.advertiserId
    state.accessToken = payload.accessToken
  },

  //modify
  addtmp(state, payload) {
    state.tmp[payload.key] = payload.title
    console.log(state.tmp)
  },
  cleartmp(state) {
    state.tmp = {}
    console.log(state.tmp)
  },
  addfinishedlist(state, payload) {
//    state.finished.push(payload.title)
    state.nowtext += "\n"
    state.nowtext += payload.title
//    console.log(state.finished)
    console.log(state.nowtext)

  },
  changenowtext(state, payload) {
    state.nowtext = payload
    console.log("helloworld")
    console.log(state.nowtext)

  },

  changefinishedlist(state, payload) {
    state.nowtext = payload.title
    console.log(state.nowtext)

  },
  addgpttexttofinishedtext(state, payload) {
    //loading画像表示
    state.showloading2 = true
    axios
      .post('/api/modify/', {
        data:
          '今あなたは、'+state.tmp.title+'の動画広告の台本を作っています。'
          +"そこで、クリエイティビティにあふれた、優秀な広告製作者であるあなたは、絶対に、"+ payload.aim + 'であるように、次の文章、'+state.nowtext+'、の続きを書いてください。 \n' 
          +'以下の制約条件を厳密に守ってください。\n' 
          +'## 制約条件 \n' 
          +'- 本文以外を消してください\n' 
          +'- 元の文章は消さないで、続きの文のみを書いてください。\n' 

                    ,      })
      .then((res) => {
        console.log(res.data)
          state.nowtext  = res.data
        //loadingの画像を消す
        state.showloading2 = false

      })
  },
async  addlist(state, payload) {
    let flag = 0;
    console.log(state.tmp)
    //前のやつ消す
    state.lists = []
    //loading画像表示
    state.showloading = true

    for (let i=0 ; i<6;i++){
    //    state.lists.push({ title: payload.title, char1:payload.char1 ,char2:payload.char2,char3:payload.char3, });
await    axios
      .post('/api/modify/', {
        data:
          '今は'+state.tmp.title+'の動画広告の台本を作っています。その'+ state.tmp.title +'の特徴は \n'
          +'その1' + state.tmp.character1 +' \n'
          +'その2' + state.tmp.character2 +'\n'
          +'その3' + state.tmp.character3 +'\n' 
          +'の３点です\n' 
          +"そこで、クリエイティビティにあふれた、優秀な広告製作者であるあなたは上の特徴を考慮して、"+ payload.aim + 'を5つ, jsonで提案してください。\n' 
          +'以下の制約条件を厳密に守ってください。\n' 
          +'## 制約条件 \n' 
          +'- 必ず出力するjsonは１つにしてください\n' 
          +'- 改行は絶対に入れないでください \n' 
          +'- keyは 数字のみにしてください\n' 
          +'- json以外の部分は消してください\n' 
          +'具体例は以下のjsonです\n' 
          +String({ 1: '第二新卒集まれ！', 2: '旅行好きにオススメ！', 3: '忙しい女子の味方', 4: '健康志向の方におすすめ', 5: 'お茶好き必見！' }),
      })
      .then((res) => {
        console.log(res.data)
        // var jsonObj = JSON.parse(res.data);
        // console.log(jsonObj);
        console.log((typeof res.data))
        if (typeof res.data != typeof {}){
          flag = 1
        }
        else if (Object.keys(res.data).length != 5){flag = 1}
        else{
        for (const target in res.data) {
          flag = 0
          console.log(target)
          state.lists.push({ title: res.data[target] })
        }}})
        console.log(flag)
        if (flag == 1){
          console.log(1111111111111111111111111111111)
          if (i == 5){
            state.lists.push({title:"エラーが起きました。もう一度試してください。"})
            state.showloading = false
          }
          continue
        }
        break
  }
        //loadingの画像を消す
        state.showloading = false
        

},
  removelist(state, payload) {
    state.lists.splice(payload.listIndex, 1)
  },
  removefinishedlist(state, payload) {
    state.finished.splice(payload.listIndex, 1)},
  addlistrewrite(state, payload) {
    console.log(payload)
    state.lists = []
    //loading画像表示
    state.showloading3 = true  
    
    axios
      .post('/api/modify/', {
        data:
          '今は'+state.tmp.title+'の動画広告の台本を作っています。'
          +"そこで、クリエイティビティにあふれた、優秀な広告製作者であるあなたは"+ payload.aim + 'を作ろうとしています。次の文'+'"'+payload.origintext+'"'+'を推敲した5つの文をjsonで提案してください。\n' 
          +'以下の制約条件を厳密に守ってください。\n' 
          +'## 制約条件 \n' 
          +'- 必ず出力するjsonは１つにしてください\n' 
          +'- 改行は絶対に入れないでください \n' 
          +'- keyは 数字のみにしてください\n' 
          +'- json以外の部分は消してください\n' 
          +'具体例は以下のjsonです\n' 
          +String({ 1: '推敲後の文1', 2: '推敲後の文2', 3: '推敲後の文3', 4: '推敲後の文4', 5: '推敲後の文5' }),
      })
      .then((res) => {
        console.log(res.data)
        for (const target in res.data) {
          state.lists.push({ title: res.data[target] })
        }
                //loadingの画像を消す
                state.showloading3 = false
})}
}
