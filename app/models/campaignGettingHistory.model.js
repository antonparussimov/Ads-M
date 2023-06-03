module.exports = (sequelize, Sequelize) => {
  const CampaignGettingHistory = sequelize.define("campaign_getting_history", {
    recId: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    addCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  });

  return CampaignGettingHistory;
};
