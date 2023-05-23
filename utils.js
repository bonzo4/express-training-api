import fs from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

export function getTrainData() {
    try {
        const data = require('./data/trains.json')
        return data
    } catch (err) {
        throw new Error(err)
    }
}

const keys = [
  'trainExpressName',
  'countryOfOrigin',
  'yearOfConstruction',
  'maxKilometerPerHour',
  'destinationFrom',
  'destinationTo'
]

export function checkTrain(data) {
    const dataKeys = Object.keys(data)
    const isValidTrain = dataKeys.every((key) => keys.includes(key))
    if (!isValidTrain) {
        throw new Error(`Missing keys: ${keys.filter((key) => !dataKeys.includes(key))}`)
    }
}

export function addTrain(data) {
    try {
        const trains = getTrainData()
        const train = {
            id: `${trains.length + 1}`,
            ...data
        }
        trains.push(train)
        writeTrainData(trains)
        return train
    } catch (err) {
        throw new Error(`Something went wrong while adding train: ${err}`)
    }
}

export function writeTrainData(data) {
    try {
        fs.writeFile('./data/trains.json', JSON.stringify(data), (err) => {
            if (err) {
                throw new Error(`Something went wrong while writing train data: ${err}`)
            }
        })
    } catch (err) {
        throw new Error(err)
    }
}

export function findTrainById(id) {
    try {
        const trains = getTrainData()
        const train = trains.find((train) => train.id === id)
        if (!train) {
            throw new Error(`Train with id ${id} not found`)
        }
        return train
    } catch (err) {
        throw new Error(err)
    }
}