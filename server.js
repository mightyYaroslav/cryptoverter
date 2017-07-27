const express = require("express");
const request = require("request");
const fx = require("money");
const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}
app.get('/', (req, res) => {
    res.send("HELLO");
})

app.get('handle', (req, res) => {

    // const baseBittrex = "https://bittrex.com/api/v1.1/"
    request.get(
        "https://api.fixer.io/latest",
        function(error, response, body) {
            if(!error && response.statusCode === 200) {
                fx.rates = response.rates
                const rate = fx(1).from(req["inputCurrency"]).to(req["outputCurrency"])
                res = {
                    inputCurrency: req["inputCurrency"],
                    outputCurrency: req["outputCurrency"],
                    rate: rate
                };
            }
        }
    )
})

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`) // eslint-disable-line no-console
})
