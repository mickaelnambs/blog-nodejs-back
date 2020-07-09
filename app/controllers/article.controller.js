const db = require('../models');
const Article = db.articles;
const Op = db.sequelize.Op;


// Create new articles.
exports.create = (req, res) => {

    // Validate request.
    if (!req.body.categoryId) {
        res.status(400).send({
            message: "Category cannot be empty !"
        });
    }

    // Create article.
    const article = {
        title: req.body.title,
        content: req.body.content,
        published: req.body.published ? req.body.published : null,
        categoryId: req.body.categoryId,
    };

    // Save article in the database.
    Article.create(article)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong !"
            });
        });
};

// Retrieve all articles.
exports.findAll = (req, res) => {
    const title = req.body.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Article.findAll({ where: condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong !"
            });
        });
};

// Retrieve one article.
exports.findOne = (req, res) => {
    const id = req.params.id;

    Article.findByPk(id, { include: ["category", "comments"] })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving article with id ${id}`
            });
        });
};

// Replace one article.
exports.update = (req, res) => {
    const id = req.params.id;

    Article.update(req.body, {
        where: { id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Artile ${id} was updated successfully !`
                });
            } else {
                res.send({
                    message: `Cannot updated article with ${id}. Maybe article was not found or req.body is empty !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating article with id ${id} !`
            });
        })
};

// Remove one article.
exports.delete = (req, res) => {
    const id = req.params.id;

    Article.destroy({ where: { id: id} })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Artile ${id} was deleted successfully !`
                });
            } else {
                res.send({
                    message: `Cannot updated article with ${id}. Maybe article was not found !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete article with id ${id}`
            });
        });
};

// Remove all articles.
exports.deleteAll = (req, res) => {
    Article.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({
                message: `${nums} were deleted with successfully !`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            });
        });
};

// Find all articles published.
exports.findAllPublished = (req, res) => {
    Article.findAll({ where: { published: true} })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong !"
            });
        });
};
