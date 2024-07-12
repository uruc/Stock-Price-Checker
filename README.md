# Stock Price Checker

This project is a full-stack JavaScript application that allows users to check real-time stock prices and "like" stocks. It's built with Node.js and Express, and uses a proxy API to fetch up-to-date stock information.

## Features

- Check real-time prices for one or two stocks simultaneously
- "Like" stocks (limited to one like per IP address per stock)
- Compare relative likes between two stocks
- RESTful API
- Simple, user-friendly web interface

## How to Use

1. Visit the [Stock Price Checker](https://urucs-stock-price-checker.glitch.me/)
2. Enter one or two stock symbols (e.g., GOOG, AAPL, MSFT)
3. Optionally check the "Like" box to like the stock(s)
4. Click "Check Stock(s)" to see the results

## API Endpoints

- GET `/api/stock-prices`
  - Query Parameters:
    - `stock`: Stock symbol (can be used twice for two stocks)
    - `like`: Set to `true` to like the stock(s)

## Technology Stack

- Node.js
- Express
- Chai (for testing)

## Privacy Note

To comply with data privacy laws, IP addresses are anonymized before being stored for the "like" functionality.

## Running Locally

1. Clone the repository
2. Run `npm install` to install dependencies
3. Set the `NODE_ENV` environment variable to `test`
4. Run `npm start` to start the server
5. Visit `localhost:3000` in your browser

## Testing

Run `npm test` to execute the functional tests.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Created as part of the FreeCodeCamp Information Security and Quality Assurance certification.
