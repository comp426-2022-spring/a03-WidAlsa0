const express = require('express')
const app = express()

var port = 5000

const server = app.listen(port, () => {
    console.log('App is running on port %port%.'.replace('%port%',port))
})

function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
}

function coinFlips(flips) {
    const array = [];
    for (let i =0; i<flips; i++) {
      array[i] = coinFlip();
    }
    return array
}

function flipACoin(call) {
    let flip = coinFlip()
    let outcome = ''
    if (flip == call) {
      outcome = 'win'
    } else {
      outcome = 'lose'
    }
    return { 'call': call, 'flip': flip, 'result': outcome }
}

app.get('./app',(req, res) => {
    res.status(200).end('OK')
    res.type('text/plain')
    res.end(res.statusCode+''+res.statusMessage)
})

app.get('/app/echo/:number', (req, res) => {
    res.status(200).json({'message': req.params.number })
    res.end(res.statusCode+''+res.statusMessage)
})

app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({'flip': flip})
    res.end(res.statusCode+''+res.statusMessage)
})

app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number)
    res.status(200).json({'flips': flips})
    res.end(res.statusCode+''+res.statusMessage)
})

app.get('/app/flip/call/heads', (req, res) => {
    var input = "heads"
    const flips = flipACoin(input)
    res.status(200).json(flips)
    res.end(res.statusCode+''+res.statusMessage)
})

app.get('/app/flip/call/tails', (req, res) => {
    var input = "tails"
    const flips = flipACoin(input)
    res.status(200).json(flips)
    res.end(res.statusCode+''+res.statusMessage)
})

app.use(function(req, res) {
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})