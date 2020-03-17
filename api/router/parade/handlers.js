import {OK, BAD_REQUEST, NOT_FOUND} from 'http-status-codes'
import { Parade } from '../../db/models'

export const getParades = (req, res, next) => {
  let { params, options } = req.data

  Parade._getMany(params, options)
    .then(parades => {
      if (!parades || parades.length === 0) {
        next({code: NOT_FOUND})
      } else {
        res.status(OK)
        res.locals.parades = parades
        next()
      }
    })
    .catch(err => {
      next({err: err, code: BAD_REQUEST})
    })
}

export const getParade = (req, res, next) => {
  let id = req.params.id
  let { options } = req.data
  
  Parade._getByUUID(id, options)
    .then(parade => {
      if(!parade)  {
        next({code: NOT_FOUND})
      } else {
        res.status(OK)
        res.locals.parade = parade
        next()
      }
    })
    .catch(err => {
        next({err: err, code: BAD_REQUEST})
    })  
}