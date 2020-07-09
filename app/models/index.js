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
db.user = require('./user.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);

db.categories.hasMany(db.articles, { as: "articles"});
db.articles.belongsTo(db.categories, { foreignKey: "categoryId", as: "category" });

db.articles.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.articles, { foreignKey: "articleId", as: "article" });

db.user.hasMany(db.articles, { as: "articles" });
db.articles.belongsTo(db.user, { foreignKey: "userId", as: "author" });

db.user.hasMany(db.comments, { as: "comments"});
db.comments.belongsTo(db.user, { foreignKey: "userId", as: "author" });

db.articles.hasMany(db.images, { as: "images" });
db.images.belongsTo(db.articles, { foreignKey: "articleId", as: "article" });

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];


module.exports = db;