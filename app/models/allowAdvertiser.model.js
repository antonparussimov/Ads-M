module.exports = (sequelize, Sequelize) => {
  const AllowAdvertiser = sequelize.define("allow_advertiser", {
    recId: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: Sequelize.BIGINT,
    },
    advertiserId: {
      type: Sequelize.BIGINT,
    }
  });

  return AllowAdvertiser;
};
