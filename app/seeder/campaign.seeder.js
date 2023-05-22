const db = require("../models");

const Campaign = db.campaigns;
const Op = db.Sequelize.Op;

module.exports = () => {
  Campaign.count().then((count) => {
    if (!count) {
      Campaign.create({
        date: "2022-08-22",
        campaignId: 1,
        campaignName: "CP1",
        groupId: 1,
        groupName: "GROUP1",
        adId: 7128276846151483393,
        adName: "AD1",
        cost: 516,
        views: 3360,
        clicks: 21,
        cv: 0,
        viewsSec: 658,
        views_full: 8,
        likes: 5,
      });
      Campaign.create({
        date: "2022-08-22",
        campaignId: 1,
        campaignName: "CP1",
        groupId: 2,
        groupName: "GROUP2",
        adId: 7128276846151483393,
        adName: "AD2",
        cost: 1289,
        views: 5176,
        clicks: 33,
        cv: 2,
        viewsSec: 1754,
        views_full: 23,
        likes: 1,
      });
      Campaign.create({
        date: "2022-08-22",
        campaignId: 2,
        campaignName: "CP2",
        groupId: 2,
        groupName: "GROUP2",
        adId: 7128276846151483393,
        adName: "AD3",
        cost: 617,
        views: 2029,
        clicks: 16,
        cv: 0,
        viewsSec: 483,
        views_full: 3,
        likes: 5,
      });
      Campaign.create({
        date: "2022-08-22",
        campaignId: 3,
        campaignName: "CP3",
        groupId: 3,
        groupName: "GROUP3",
        adId: 7128276846151483393,
        adName: "AD4",
        cost: 46,
        views: 135,
        clicks: 0,
        cv: 0,
        viewsSec: 22,
        views_full: 0,
        likes: 0,
      });
    }else {
      console.log("Already inserted seed data");
      return;
    }
  });
};
