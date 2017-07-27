const express = require("express");
const request = require("request");
const fx = require("money");
const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

//Returns list of currencies
app.get('/getcurrencies', (req, res) => {
    request.get(
        'http://api.fixer.io/latest',
        function(err, response, body) {
            res.send(Object.keys(JSON.parse(body)["rates"]))
        }
    )
})

//Returns rates for currency
//@param inputCurrency
app.get('/getrate', (req, res) => {
    request.get(
        `http://api.fixer.io/latest?base=${req.inputCurrency}`,
        function(err, response, body) {
            res.send(JSON.parse(body)["rates"])
        }
    )
})


app.get('/handle', (req, res) => {

    // const baseBittrex = "https://bittrex.com/api/v1.1/"
    request.get(
        `https://bittrex.com/api/v1.1/public/getcurrencies`,
        function(error, response, body) {
            if(!error && response.statusCode === 200) {
                fx.rates = response["body"].rates
                // const rate = fx(1).from(req["inputCurrency"]).to(req["outputCurrency"])
                res.send({
                    inputCurrency: req["inputCurrency"],
                    outputCurrency: req["outputCurrency"],
                    response: response.body.result,
                    body: body
                });
            }
        }
    )
})

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`) // eslint-disable-line no-console
})
