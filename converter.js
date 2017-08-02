const request = require("request")
const mediatorCurrency = "usd"

function fiatToFiat(res, input, output, callback) {
    request.get(
        `http://api.fixer.io/latest?symbols=${input.toUpperCase()},${output.toUpperCase()}`,
        function (err, response, body) {
            const rates = JSON.parse(body)["rates"]
            callback(res, rates[output] / rates[input], output)
        }
    )
}

function fiatToCrypto(res, rateToUsd, output, direct = true) {
    request.get(
        `https://api.cryptonator.com/api/full/${mediatorCurrency.toLowerCase()}-${output.toLowerCase()}`,
        function (err, response, body) {
            const rate = rateToUsd * JSON.parse(body).ticker.price
            res.send({
                rate: direct ? rate : 1 / rate
            })
        }
    )
}

function cryptoToFiat(res, rateToUsd, output) {
    return fiatToCrypto(res, rateToUsd, output, false)
}

exports.convert = {
    f2f: function(res, input, output) {
        fiatToFiat(res, input, output, (res, rate) => res.send({
            rate: rate
        }))
    },
    f2c: function(res, input, output) {
        if (input.toLowerCase() === mediatorCurrency)
            fiatToCrypto(res, 1, output)
        else
            fiatToFiat(res, input, mediatorCurrency, fiatToCrypto)
    },
    c2f: function(res, input, output) {
        if (output.toLowerCase() === mediatorCurrency)
            cryptoToFiat(res, 1, output)
        else
            fiatToFiat(res, output, mediatorCurrency, cryptoToFiat)
    }
}