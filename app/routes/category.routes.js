module.exports = app => {
    const categories = require('../controllers/category.controller.js');

    var router = require("express").Router();

    // Create new category.
    router.post('/', categories.create);

    // Retrieve all categories.
    router.get('/', categories.findAll);

    // Retrieve category.
    router.get('/:id', categories.findOne);

    // Update category.
    router.put('/:id', categories.update);

    // Delete category.
    router.delete('/:id', categories.delete);

    app.use('/api/categories', router);
};