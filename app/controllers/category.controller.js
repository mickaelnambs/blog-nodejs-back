const db = require('../models');
const Category = db.categories;
const Article = db.articles;


// Create new category.
exports.create = (req, res) => {
    // Validate request.
    if (!req.body.title) {
        res.status(400).send({
            message: "Content cannot be empty !"
        });
    }

    // Create category.
    const category = {
        title: req.body.title
    };

    // Save category in the database.
    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Something went wrong !"
            });
        });
};

// Retrieve one category with comments.
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id, { include: ["articles"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving category with id ${id} !`
            });
        });
};

// Retrieve all categories with comments.
exports.findAll = (req, res) => {
    Category.findAll({ include: ["articles"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong !"
            });
        });
};

// Update category.
exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Category with id ${id} was updated with successfully`
                });
            } else {
                res.send({
                    message: `Error updating category with id ${id}. Maybe category was not found or req.body is empty !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Cannot updating category with id ${id} !`
            });
        });
};

// delete one category with comments.
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({ where: { id: id} })
        .then(num => {
            if (num == 1) {
                res.send({ 
                    message: `Category with id ${id} was deleted successfully` 
                });
            } else {
                res.send({
                    message: `Error deleting category with id ${id}. Maybe category was not found !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Cannot removing category with id ${id} !`
            });
        });
};