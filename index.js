const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    const data = require('./data/trains.json')
    res.send(data)
})

app.post('/', async (req, res) => {
    const data = require('./data/trains.json')
    data.push({
        id: `${data.length + 1}`,
        ...req.body
    })
    fs.writeFile('./data/trains.json', JSON.stringify(data), (err) => {
        if (err) {
            res.send(err)
            return
        }
    })
    res.send(req.body)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
