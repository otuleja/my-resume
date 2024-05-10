const request = require("request");

function createPromise(url) {
  return new Promise(async (resolve, reject) => {
    request(
      url,
      function (error, response, responseBody) {
        if (error) {
          resolve({ result: false })
        }
        resolve({ ...JSON.parse(responseBody) })
      }
    );

  })

}

function squashPriceObjArrays(priceObj) {
  const result = {};

  // Iterate through each category in the priceObj
  Object.keys(priceObj).forEach(category => {
    priceObj[category].forEach(entry => {
      const { day, stringDay, value, dividend } = entry;
      const key = day; // or stringDay, depending on which you prefer to use for uniqueness

      if (!result[key]) {
        result[key] = {
          day,
          stringDay,
          value: 0, // Initialize value for this day

        };
      }

      // Aggregate the values for the same day
      result[key].value += value;
    });
  });

  // Convert the result object back into an array
  return Object.values(result);
}

function handlePrices(priceObj, multiplier = 1, useAdjusted = false) {
  const purchaseDate = "2023-12-05"
  // const purchaseDate = "2023-09-26"
  const purchaseAmount = 1000

  for (let ticker in priceObj) {
    let pricesObject = priceObj[ticker]
    let prices = []
    for (let day in pricesObject) {
      let close
      if (useAdjusted) {
        close = parseFloat(pricesObject[day]["5. adjusted close"])
      } else {


        close = parseFloat(pricesObject[day]["4. close"])
      }
      const dividend = parseFloat(pricesObject[day]["7. dividend amount"])
      prices.push({ day: new Date(day), stringDay: day, close, dividend })
    }
    prices = prices.sort((a, b) => a.day - b.day)
    let amount = 0
    prices = prices.filter(priceObj => {
      return priceObj.day.getTime() >= new Date(purchaseDate).getTime()
    })
    prices = prices.map((priceObj, index) => {
      if (index === 0) {
        amount = purchaseAmount / priceObj.close
      }
      priceObj.amount = amount
      if (priceObj.dividend && !useAdjusted) {
        priceObj.amount = priceObj.amount + ((priceObj.dividend * priceObj.amount) / priceObj.close)
        amount = priceObj.amount
      }
      priceObj.value = priceObj.amount * priceObj.close
      return priceObj
    })
    priceObj[ticker] = prices
  }
  const BASE_PRICE = 1000
  let finalPrices = squashPriceObjArrays(priceObj)
  finalPrices = finalPrices.map(priceObj => {
    priceObj.value = priceObj.value / multiplier
    return priceObj
  })
  return finalPrices
}


exports.createPromise = createPromise
exports.squashPriceObjArrays = squashPriceObjArrays
exports.handlePrices = handlePrices