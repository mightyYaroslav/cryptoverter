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
                    currencies.concat(JSON.parse(body).rows.map((o) => o.code))
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
// - c2f: conevrsion from crypto currency to fiat
app.get('/getrate', (req, res) => {
    const mediator = "usd"
    const modes = {
        f2f: "f2f",
        f2c: "f2c",
        c2f: "c2f"
    }


    const type = req.query.type
    const input = req.query.inputCurrency.toLowerCase()
    const output = req.query.outputCurrency.toLowerCase()

    function fiatToFiat(input, output, callback) {
        request.get(
            `http://api.fixer.io/latest?symbols=${input.toUpperCase()},${output.toUpperCase()}`,
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

    if (!input || !output) res.send(null)
    switch(type) {
    case modes.f2c:
        if (input.toLowerCase() === "usd")
            fiatToCrypto(res, 1)
        else
            fiatToFiat(input, "USD", fiatToCrypto)
        break
    case modes.c2f:
        fiatToFiat(output, "USD", fiatToCrypto)
        break
    default:
        fiatToFiat(input, output, (res, rate) => res.send({
            rate: rate
        }))
    }
})

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`) // eslint-disable-line no-console
})
