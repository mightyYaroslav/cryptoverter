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

//Returns rates for conversion
app.get('/getrate', (req, res) => {
    //@param inputCurrency
    const input = req.query.inputCurrency
    const output = req.query.outputCurrency

    if(!input) res.send(null)
    if(output) {
        request.get(
            `http://api.fixer.io/latest?symbols=${input},${output}`,
            function (err, response, body) {
                const rates = JSON.parse(body)["rates"]
                res.send({
                    rate: rates[output] / rates[input]
                })
            }
        )
    } else {
        request.get(
            `http://api.fixer.io/latest?base=${input}`,
            function (err, response, body) {
                res.send(JSON.parse(body)["rates"])
            }
        )
    }
})

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`) // eslint-disable-line no-console
})
