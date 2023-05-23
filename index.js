import express from 'express'

const app = express()

import { getTrainData, checkTrain, addTrain, findTrainById, writeTrainData }  from './utils.js'

app.use(express.json())

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    const data = getTrainData()
    res.send(data)
})

app.post('/',(req, res) => {
    try {
        checkTrain(req.body)
        const train = addTrain(req.body)
        res.send(train)
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const train = findTrainById(id)
        const { body } = req
        checkTrain(body)
        const updatedTrain = { ...train, ...body }
        const data = getTrainData()
        const index = data.findIndex((train) => train.id === id)
        data[index] = updatedTrain
        writeTrainData(data)
        res.send(updatedTrain)
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
