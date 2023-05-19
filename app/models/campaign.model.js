module.exports = (sequelize, Sequelize) => {
  const Campaign = sequelize.define("campaign", {
    recId: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    campaignId: {
      type: Sequelize.BIGINT,
    },
    campaignName: {
      type: Sequelize.STRING,
    },
    campaignGroupId: {
      type: Sequelize.BIGINT
    },
    groupName: {
      type: Sequelize.STRING,
    },
    adId: {
      type: Sequelize.BIGINT,
    },
    adName: {
      type: Sequelize.STRING
    },
    cost: {
      type: Sequelize.DOUBLE,
    },
    views: {
      type: Sequelize.INTEGER,
    },
    clicks: {
      type: Sequelize.INTEGER,
    },
    cv: {
      type: Sequelize.INTEGER,
    },
    viewsSec: {
      type: Sequelize.INTEGER,
    },
    viewsFull: {
      type: Sequelize.INTEGER,
    },
    likes: {
      type: Sequelize.INTEGER,
    }
  });

  return Campaign;
};
