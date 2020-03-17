import bcrypt from 'bcrypt'
import { saltRounds } from '../constants'

export const checkPass = (password, hash) => {
  return bcrypt.compare(password, hash)
}

export const hashPass = (password) => {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if(!err) {
        resolve(hash)
      } else {
        reject(err) // todo : handle error
      }
    })
  })
}

export const getFlatBody = (body) => {
  let data
  if(body.hasOwnProperty('payload')) {
    data = body.payload
  } else {
    // todo : handle others cases ?
    data = body
  }

  return data
}