module.exports = app => {
    const upload = require('../config/upload.config.js');
    const images = require('../controllers/upload.controller.js');

    app.post('/api/uploadfile', upload.single("uploadfile"), images.upload);
};