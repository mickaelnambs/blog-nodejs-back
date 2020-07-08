module.exports = app => {
    const articles = require('../controllers/article.controller.js');

    var router = require("express").Router();
    
    // Create new article.
    router.post('/', articles.create);

    // Retrieve all articles.
    router.get('/', articles.findAll);

    // Retrieve article.
    router.get('/:id', articles.findOne);

    // Update article.
    router.put('/:id', articles.update);

    // Delete article.
    router.delete('/:id', articles.delete);

    // Create new article.
    router.delete('/', articles.deleteAll);


    app.use('/api/articles', router);
};