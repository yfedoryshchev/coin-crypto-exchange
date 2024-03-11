require('dotenv').config();
const axios = require('axios');
const CryptoJS = require('crypto-js');
const Big = require('big.js');
const _ = require('lodash');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

/**
 * Fetches the current price of a cryptocurrency.
 * @param {string} coinId The ID of the cryptocurrency.
 * @param {string} currency The fiat or crypto currency to convert to.
 * @returns {Promise<Big>}
 */
async function fetchCryptoPrice(coinId, currency = 'usd') {
  const cacheKey = `${coinId}-${currency}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    return new Big(cached);
  }

  try {
    const response = await axios.get(`${API_URL}?ids=${coinId}&vs_currencies=${currency}`);
    const price = _.get(response.data, `${coinId}.${currency}`, null);
    if (price) {
      cache.set(cacheKey, price);
      return new Big(price);
    }
    throw new Error('Price not found');
  } catch (error) {
    console.error('Error fetching crypto price:', error.message);
    throw error;
  }
}

/**
 * Converts an amount from one cryptocurrency to another.
 * @param {Big} amount The amount of the source cryptocurrency.
 * @param {string} fromCoinId The ID of the source cryptocurrency.
 * @param {string} toCoinId The ID of the target cryptocurrency.
 * @returns {Promise<Big>}
 */
async function convertCrypto(amount, fromCoinId, toCoinId) {
  try {
    const [fromPrice, toPrice] = await Promise.all([
      fetchCryptoPrice(fromCoinId, 'usd'),
      fetchCryptoPrice(toCoinId, 'usd')
    ]);
    return amount.mul(fromPrice).div(toPrice);
  } catch (error) {
    console.error('Error converting crypto:', error.message);
    throw error;
  }
}

module.exports = {
  fetchCryptoPrice,
  convertCrypto
};
