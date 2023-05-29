module.exports = (sequelize, Sequelize) => {
  const AllowAdvertiser = sequelize.define("allow_advertiser", {
    userId: {
      type: Sequelize.BIGINT,
    },
    advertiserId: {
      type: Sequelize.BIGINT,
    }
  });

  return AllowAdvertiser;
};
