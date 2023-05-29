module.exports = (sequelize, Sequelize) => {
  const Advertiser = sequelize.define("advertiser", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    advertiserId: {
      type: Sequelize.BIGINT,
    },
    accessToken: {
      type: Sequelize.STRING,
    }
  });

  return Advertiser;
};
