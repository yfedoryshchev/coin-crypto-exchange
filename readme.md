# Simple Crypto Exchange

Simple Crypto Exchange is a lightweight library designed for fetching cryptocurrency prices from multiple sources and converting between different cryptocurrencies with ease.

## Features

- Fetch real-time cryptocurrency prices.
- Convert amounts between different cryptocurrencies.
- Cache responses to improve performance and reduce API calls.
- Easy to integrate and use in any JavaScript project.

## Installation

Install simple-crypto-exchange with npm:

```bash
npm install simple-crypto-exchange
```

## Usage

First, require the library in your project:

```javascript
const { fetchCryptoPrice, convertCrypto } = require('simple-crypto-exchange');
```

### Fetching Cryptocurrency Prices

To fetch the current price of a cryptocurrency:

```javascript
fetchCryptoPrice('bitcoin', 'usd')
.then(price => console.log(`The current price of Bitcoin is \$\${price.toString()}`))
.catch(err => console.error(err));
```

### Converting Between Cryptocurrencies

To convert an amount from one cryptocurrency to another:

```javascript
convertCrypto(new Big(1), 'bitcoin', 'ethereum')
.then(amount => console.log(`1 Bitcoin is equivalent to \${amount.toString()} Ethereum`))
.catch(err => console.error(err));
```

## Dependencies

This library uses the following dependencies:
- axios: For making API requests.
- dotenv: For loading environment variables.
- crypto-js: For secure cryptographic operations.
- big.js: For precise arithmetic operations.
- lodash: For utility functions.
- node-cache: For caching API responses.

## Contributing

Contributions are welcome! If you have a feature request or bug report, please open an issue on GitHub.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
