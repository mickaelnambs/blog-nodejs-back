const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    OperatorsAliases: false,

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

db.articles = require('./article.model.js')(sequelize, Sequelize);
db.categories = require('./category.model.js')(sequelize, Sequelize);
db.comments = require('./comment.model.js')(sequelize, Sequelize);
db.images = require('./image.model.js')(sequelize, Sequelize);

db.categories.hasMany(db.articles, { as: "articles"});
db.articles.belongsTo(db.categories, { foreignKey: "categoryId", as: "category" });

db.articles.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.articles, { foreignKey: "articleId", as: "article" });

db.articles.hasMany(db.images, { as: "images" });
db.images.belongsTo(db.articles, { foreignKey: "articleId", as: "article" });


module.exports = db;