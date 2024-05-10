var express = require('express');
var router = express.Router();
const S3 = require('aws-sdk/clients/s3');
require('dotenv').config()
const alphaBaseUrl = `https://www.alphavantage.co/query?`;
const alphaApiKey = "4B96TGMQO6PS9SEL"
const { createPromise, squashPriceObjArrays, handlePrices } = require('../../functions')



router.get("/health", async (req, res) => {
  res.send(JSON.stringify({ status: "ok" }))
})

router.get("/getSignedUrl/:bucketName/:key", async (req, res) => {
  const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  });
  const Key = req.params.key;
  let config = {
    Bucket: req.params.bucketName,
    Key,
  };
  const a = () => {
    return s3.getSignedUrlPromise('getObject', {
      ...config,
      Expires: 600,
    });
  };

  const url = await a();
  console.log("url", url)

  res.send(JSON.stringify({ url }))
})

router.get("/bank-valuation-chart-data", async (req, res) => {
  const tickers = ["CFG", "RBB", "HOPE", "TCBX", "VBTX"]
  const results = await Promise.all(tickers.map(async ticker => {
    let url = `${alphaBaseUrl}function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${alphaApiKey}`
    const payload = await createPromise(url)
    return { ticker, payload }
  }))
  let priceObj = results.reduce((acc, result) => {
    const { ticker, payload } = result
    acc[ticker] = payload["Time Series (Daily)"]
    return acc
  }, {})
  const finalPrices = handlePrices(priceObj, tickers.length)




  // console.log("finalPrices", finalPrices)

  let ticker = "SPY"
  let url = `${alphaBaseUrl}function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${alphaApiKey}`

  let spyResultPayload = await createPromise(url)
  const spyResultPriceObj = {}
  spyResultPriceObj[ticker] = spyResultPayload["Time Series (Daily)"]
  const spyPrices = handlePrices(spyResultPriceObj)
  res.send(JSON.stringify({ banks: finalPrices, spy: spyPrices }))

})


module.exports = router;
