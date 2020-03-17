import mongoose from 'mongoose'
import { loadModels, Seed } from './models'
import queryPlugin from './models/schemas/plugins/queryPlugin'
import { defaultMongooseFields } from '../constants'
import { seed1 } from './seed1'
import { seed2 } from './seed2'
import { seed3 } from './seed3'

const mongoDB = 'mongodb://localhost/carnival'
let db

function removeFields(object, fields) {
  fields.forEach(field => {
    if(object.hasOwnProperty(field)) {
      object[field] = undefined
    }
  })
  return object
}

function toPlainItem(item, fields) {
  let plainItem = item.toObject()
  removeFields(plainItem, defaultMongooseFields)
  removeFields(plainItem, fields)

  return plainItem
}

// === EXPORTS ===

export const initDatabase = (callback) => {
  mongoose.connect(mongoDB, { useUnifiedTopology: true })
  mongoose.Promise = global.Promise
  db = mongoose.connection
  mongoose.plugin(queryPlugin)
  loadModels()

  db.once('open', function() {
    console.log('open db')    
    if (callback) callback()

    Seed._getOne({ name: 'initial' })
      .then(seed => {
        if (!seed) {
          seed1()
          seed2()
          seed3()

          Seed._create(new Seed({name: 'initial'}))
        }
      })
  })
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))
  // Todo Quantum : close database on disconnect
}

export const closeDatabase = () => {
  db.close()
}

export const toPlainObject = (item, fields = []) => {
  if(Array.isArray(item)) {
    return item.map(i => {
      return toPlainItem(i, fields)
    })
  } else {
    return toPlainItem(item, fields)
  }
}

export const isMongoData = (item) => {
  if(!item) {
    return false
  } else {
    return Array.isArray(item) ? 
      item[0].constructor.name === 'model' : 
      item.constructor.name === 'model'
  }
}

export const getID = (arr, attr, value) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][attr] === value) {
      return arr[i]._id
    }
  }
}