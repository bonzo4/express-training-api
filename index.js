const express = require('express')
const app = express()

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    const data = require('./data/trains.json')
    res.send(data)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
