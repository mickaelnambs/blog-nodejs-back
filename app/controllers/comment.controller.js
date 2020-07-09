const db = require('../models');
const Comment = db.comments;


// Create new comment.
exports.create = (req, res) => {
    // Validate request.
    if (!req.body.articleId) {
        res.status(400).send({ message: "ArticleId cannot be empty !"});
    }

    // Create comment.
    const comment = {
        content: req.body.content,
        articleId: req.body.articleId
    };

    Comment.create(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Something went wrong !" });
        });
};

// Retrieve one comment.
exports.findOne = (req, res) => {
    const id = req.params.id;

    Comment.findByPk(id, { include: ["article"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: `Error retrieving comment with id ${id}`});
        });
};

// Retrive all comments.
exports.findAll = (req, res) => {
    Comment.findAll({ include: ["article"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Something went wrong !" });
        });
};

// Replace comments.
exports.update = (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, { where: { id: id} })
        .then(num => {
            if (num == 1) {
                res.send({ message: `Comment with id ${id} was updated successfully !`});
            } else {
                res.send({ 
                    message: `Error updating comment with id ${id}. Maybe comment was not found or req.body is empty !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Cannot updating comment with id ${id} !`});
        });
};

// Delete comments.
exports.delete = (req, res) => {
    const id  = req.params.id;

    Comment.destroy({ where: { id: id} })
        .then(num => {
            if (num == 1) {
                res.send({ message: `Comment with id ${id} was deleted successfully !`});
            } else {
                res.send({ 
                    message: `Error deleting comment with id ${id}. Maybe comment was not found !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Cannot deleting comment with id ${id} !`});
        });
};

