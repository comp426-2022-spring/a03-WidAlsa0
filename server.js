const express = require('express')
const app = express()

var port = 5000

const server = app.listen(port, () => {
    console.log('App is running on port %port%.'.replace('%port%',port))
})

app.get('./app',(req, res) => {
    res.status(200).end('OK')
    res.type('text/plain')
    res.end(res.statusCode+''+res.statusMessage)
})

app.get('/app/echo/:number', (req, res) => {
    res.status(200).json({'message': req.params.number })
})

app.use(function(req, res) {
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})