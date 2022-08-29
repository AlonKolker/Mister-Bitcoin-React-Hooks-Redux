const axios = require("axios").default

export const bitcoinService = {
  getRate,
  getMarketPrice,
  getConfirmedTransactions,
}
async function getRate(coins) {
  let btc = null
  await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`).then((res) => (btc = res.data))
  return btc
  //  return btc
}

async function getMarketPrice(timePeriod='10') {
  console.log(timePeriod);
//   console.log("getMarketPrice")
  let marketPrices = null
  await axios
    .get(`https://api.blockchain.info/charts/market-price?timespan=${timePeriod}months&format=json&cors=true`)
    .then((res) => (marketPrices = res.data))
  //  console.log(marketPrices);

  return marketPrices
}

async function getConfirmedTransactions(timePeriod='10') {
  // console.log('ConfirmedTransactions');
  let ConfirmedTransactions = null
  await axios
    .get(`https://api.blockchain.info/charts/trade-volume?timespan=${timePeriod}months&format=json&cors=true`)
    .then((res) => (ConfirmedTransactions = res.data))

  return ConfirmedTransactions
}
