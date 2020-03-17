import {OK, BAD_REQUEST, NOT_FOUND} from 'http-status-codes'
import { Group } from '../../db/models'
import { getFlatBody } from '../../utils'

export const getGroups = (req, res, next) => {
  let { params, options } = req.data

  Group._getMany(params, options)
    .then(groups => {
      if (!groups || groups.length === 0) {
        next({code: NOT_FOUND})
      } else {
        res.status(OK)
        res.locals.groups = groups
        next()
      }
    })
    .catch(err => {
      next({err: err, code: BAD_REQUEST})
    })
}

export const getGroup = (req, res, next) => {
  let id = req.params.id
  let { options } = req.data
  
  Group._getByUUID(id, options)
    .then(group => {
      if(!group)  {
        next({code: NOT_FOUND})
      } else {
        res.status(OK)
        res.locals.group = group
        next()
      }
    })
    .catch(err => {
        next({err: err, code: BAD_REQUEST})
    })  
}

export const updateGroupPosition = (req, res, next) => {
  let id = req.params.id
  let {lat, lng} = getFlatBody(req.body)
  let { options } = req.data

  console.log(id)
  Group._getByUUID(id, options)
    .then(group => {
      if (!group) {
        next({code: BAD_REQUEST})
      } else {
        group.position = {lat: lat, lng: lng}
        group.save(err => {
          if (!err) {
            console.log(req.io)
            req.io.emit('groupPositionUpdated', {id: group.uuid, position: group.position})
            res.status(OK)
            res.locals.group = group
            next()
          }
        })
      }
    })
}