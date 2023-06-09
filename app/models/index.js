const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.campaigns = require("./campaign.model.js")(sequelize, Sequelize);
db.campaignsPresets = require('./campaign_presets.model.js')(sequelize, Sequelize);
db.campaignGettingHistory = require('./campaignGettingHistory.model.js')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);
db.advertiser = require('./advertiser.model.js')(sequelize, Sequelize);
db.allowAdvertiser = require('./allowAdvertiser.model.js')(sequelize, Sequelize);

//associations
db.advertiser.belongsToMany(db.user, { through: 'advertiser_user' });
db.user.belongsToMany(db.advertiser, { through: 'advertiser_user' });

module.exports = db;
