module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    allowStatus: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    }
  });

  return User;
};
