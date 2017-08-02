const express = require("express");
const request = require("request");
const fx = require("money");
const converter = require("./converter.js");
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
    const type = req.query.type || "f2f"
    const input = req.query.inputCurrency
    const output = req.query.outputCurrency

    if (!input || !output) res.send(null)
    converter.convert[type](res, input, output)
})

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`) // eslint-disable-line no-console
})
