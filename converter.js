const request = require("request")
const mediatorCurrency = "usd"

function fiatToFiat(res, input, output, callback) {
    input = input.toUpperCase();
    output = output.toUpperCase();
    request.get(
        `http://api.fixer.io/latest?symbols=${input},${output}`,
        function (err, response, body) {
            const rates = JSON.parse(body)["rates"]
            callback(res, rates[output] / rates[input])
        }
    )
}

function fiatToCrypto(res, rateToUsd, cryptoOutput, direct = true) {
    request.get(
        `https://api.cryptonator.com/api/full/${mediatorCurrency.toLowerCase()}-${cryptoOutput.toLowerCase()}`,
        function (err, response, body) {
            const rate = JSON.parse(body).ticker.price / rateToUsd
            res.send({ rate: direct ? rate : 1 / rate })
        }
    )
}

function cryptoToFiat(res, rateToUsd, cryptoOutput) {
    return fiatToCrypto(res, rateToUsd, cryptoOutput, false)
}

exports.convert = {
    f2f: function(res, input, output) {
        fiatToFiat(res, input, output, (res, rate) => res.send({ rate: rate }))
    },
    f2c: function(res, input, output) {
        if (input.toLowerCase() === mediatorCurrency)
            fiatToCrypto(res, 1, output)
        else
            fiatToFiat(res, input, mediatorCurrency, (res, rate) => fiatToCrypto(res, rate, output))
    },
    c2f: function(res, input, output) {
        if (output.toLowerCase() === mediatorCurrency)
            cryptoToFiat(res, 1, input)
        else
            fiatToFiat(res, output, mediatorCurrency, (res, rate) => cryptoToFiat(res, rate, input))
    }
}