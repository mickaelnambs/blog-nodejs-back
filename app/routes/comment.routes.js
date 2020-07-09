module.exports = app => {
    const comments = require('../controllers/comment.controller.js');

    var router = require("express").Router();

    // Create new comment.
    router.post('/', comments.create);

    // Retrieve all comments.
    router.get('/', comments.findAll);

    // Retrieve comment.
    router.get('/:id', comments.findOne);

    // Update comment.
    router.put('/:id', comments.update);

    // Delete comment.
    router.delete('/:id', comments.delete);

    app.use('/api/comments', router);
};