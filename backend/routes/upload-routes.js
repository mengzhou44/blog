const AWS = require('aws-sdk');
const uuid = require('uuid/v1');

const requireLogin = require('../_common/middlewares/require-login');

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});


module.exports = app => {
    app.get('/api/upload', requireLogin, (req, res) => {
        const key = `${req.user.id}/${uuid()}.jpeg`;

        s3.getSignedUrl(
            'putObject',
            {
                Bucket: process.env.S3_BUCKET_NAME,
                ContentType: 'image/jpeg',
                Key: key
            },
            (err, url) => res.send({ key, url })
        );
    });
}; 