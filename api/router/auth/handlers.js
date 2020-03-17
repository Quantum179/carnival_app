import {OK, CREATED, BAD_REQUEST, NOT_FOUND} from 'http-status-codes'
import { User } from '../../db/models'
import { checkPass, getFlatBody } from '../../utils'
import { createToken } from '../../passport'

export const postLogin = (req, res, next) => {
  //TODO : Redirection when already logged (checks token in list)
  let { name, password } = getFlatBody(req.body)
  console.log(name)
  User._getOne({name: name})
    .then(user => {
      if (!user) {
        next({code: NOT_FOUND})
      } else {
        if (!user.password === password) {
          next({code: NOT_FOUND})
        } else {
          res.status(OK)
          res.locals.token = createToken({ name: user.name, uuid: user.uuid })
          res.locals.user = user // todo : remove useless informations
          next()
        }
        checkPass(password, user.password)
          .then(result => {
            if(!result) {
              next({code: NOT_FOUND})
            } else {
              //check connexion status 
                res.status(OK)
                res.locals.token = createToken(user)
                res.locals.user = user.name
                next()
            }                
          })
      }
    })
    .catch(err => {
        next({err: err, code: BAD_REQUEST})
    })   
}

export const postRegister = (req, res, next) => {
  let { user } = getFlatBody(req.body)

  User._create(user)
    .then(savedUser => {
      res.status(CREATED)
      res.locals.user = savedUser
      next()
    })
    .catch(err => {
      //TODO: match mongoose error return to constant value (invalid form or duplicated unique fields)
      next({err: err, code: BAD_REQUEST})
    })
}