const fs = require('fs');

const db = require('../models');
const Image = db.images;


// Upload a Multipart-File then saving it to MySQL database.
exports.upload = (req, res) => {

    if (!req.body.articleId) {
        res.status(400).send({
            message: "Content cannot be empty !"
        });
    }

    const image = {
        type: req.file.mimetype,
        name: req.file.originalname,
        articleId: req.body.articleId,
        data: fs.readFileSync(__basedir + '/resources/static/assets/uploads/' + req.file.filename)
    };

    Image.create(image)
        .then(image => {
            try {
                fs.writeFileSync(__basedir + '/resources/static/assets/tmp/' + image.name, image.data);

                // exit node.js app
                res.json({
                    'msg': 'File uploaded successfully!',
                    'file': req.file
                });
            } catch (err) {
                console.log(err);
                res.json({
                    'err': err
                });
            }
        })
};