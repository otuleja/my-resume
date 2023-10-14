var express = require('express');
var router = express.Router();
const S3 = require('aws-sdk/clients/s3');
require('dotenv').config()


router.get("/health", async (req, res) => {
  res.send(JSON.stringify({ status: "ok" }))
})

router.get("/getSignedUrl/:fileName", async (req, res) => {
  const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  });
  const Key = `Lesson_3.mp4`;
  let params = {
    Bucket: 'react-class-videos',
    Key,
  };
  const a = () => {
    return s3.getSignedUrlPromise('getObject', {
      ...params,
      Expires: 600,
    });
  };

  const url = await a();
  console.log("url", url)

  res.send(JSON.stringify({ url }))
})


module.exports = router;
