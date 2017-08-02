const express = require("express");
const request = require("request");
// require('request').debug = true
const fx = require("money");
const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.get('/temp', (req, res) => {
    request.get(
        {
            url: 'https://www.cryptonator.com/api/currencies'
        },

        function (err, response, body) {
            console.log(err)
            console.log(response)
            console.log(body)
            currencies.concat(JSON.parse(body).rows.map((o) => o.code))
            res.send(JSON.stringify(currencies.forEach((t, i) => {
                    let obj = {
                        key: "c" + i,
                        value: "c" + i,
                        text: t
                    }
                    console.log(obj);
                    return obj
                }
            )))
        }
    )
})

//Returns list of currencies
app.get('/getcurrencies', (req, res) => {
    request.get(
        'http://api.fixer.io/latest',
        function (err, response, body) {
            let currencies = Object.keys(JSON.parse(body)["rates"])
            request.get(
                'https://www.cryptonator.com/api/currencies',
                function (err, response, body) {
                    console.log(err)
                    console.log(response)
                    console.log(body)
                    currencies.concat(JSON.parse(body2).rows.map((o) => o.code))
                    res.send(currencies.forEach((t, i) => {
                            let obj = {
                                key: "c" + i,
                                value: "c" + i,
                                text: t
                            }
                            console.log(obj);
                            return obj
                        }
                    ))
                }
            )
        }
    )
})

//Returns rates for conversion
//Parameters:
//@type
// - f2f: conversion between two fiat currencies
// - f2c: conversion between any fiat currency to crypto
app.get('/getrate', (req, res) => {
    const type = req.query.type
    const input = req.query.inputCurrency
    const output = req.query.outputCurrency

    function fiatToFiat(input, output, callback) {
        request.get(
            `http://api.fixer.io/latest?symbols=${input},${output}`,
            function (err, response, body) {
                const rates = JSON.parse(body)["rates"]
                callback(res, rates[output] / rates[input])
            }
        )
    }

    function fiatToCrypto(res, rateToUsd) {
        request.get(
            `https://api.cryptonator.com/api/full/usd-${output.toLowerCase()}`,
            function (err, response, body) {
                res.send({
                    rate: rateToUsd * JSON.parse(body).ticker.price
                })
            }
        )
    }

    if (!input) res.send(null)
    if (output) {
        if (type === "f2c") {
            if (input.toLowerCase() === "usd")
                fiatToCrypto(res, 1)
            else
                fiatToFiat(input, "USD", fiatToCrypto)
        } else {
            request.get(
                `http://api.fixer.io/latest?symbols=${input},${output}`,
                function (err, response, body) {
                    const rates = JSON.parse(body)["rates"]
                    res.send(({
                        rate: rates[output] / rates[input]
                    }))
                }
            )
        }
    }
})

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`) // eslint-disable-line no-console
})
