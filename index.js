import express from 'express'

const app = express()

import { getTrainData, checkTrain, addTrain }  from './utils.js'

app.use(express.json())

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    const data = getTrainData()
    res.send(data)
})

app.post('/', async (req, res) => {
    try {
        checkTrain(req.body)
        const train = addTrain(req.body)
        res.send(train)
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
