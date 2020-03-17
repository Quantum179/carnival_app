import { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, CREATED } from 'http-status-codes'
import { v4 as uuid4} from 'uuid'
import { User, Vote, Parade, Group } from '../../db/models'
import { getFlatBody } from '../../utils'
import { verifyToken } from '../../passport'

export const getVotes = (req, res, next) => {
  // todo : use aggregate instead
  let { params, options } = req.data

  Vote._getMany({}, options)
    .then(votes => {
      if (!votes || votes.length === 0) {
        next({code: NOT_FOUND})
      } else {
        if (params) {
          votes = votes.filter(vote => vote.parade.uuid === params.parade && vote.group.uuid === params.group)
          if (votes.length === 0) {
            next({code: NOT_FOUND})
          }
        }
        res.status(OK)
        res.locals.votes = votes
        next()
      }
    })
    .catch(err => {
      next({err: err, code: BAD_REQUEST})
    })
}

export const postVote = (req, res, next) => {
  let { ids, data } = getFlatBody(req.body)
  let { uuid } = verifyToken(ids.token)

  Promise.all([
    User._getByUUID(uuid),
    Parade._getByUUID(ids.parade),
    Group._getByUUID(ids.group)
  ])
    .then(results => {
      if (!results[0] || !results[1] || !results[2]) {
        next({code: BAD_REQUEST})
      } else {
        Vote._getMany({ user: results[0]._id, parade: results[1]._id, group: results[2]._id })
          .then(votes => {
            if (votes && votes.length > 0) {
              next({code: BAD_REQUEST, msg: "Déjà voté"})
            } else {
              let vote = new Vote({
                uuid: uuid4(),
                user: results[0]._id,
                parade: results[1]._id,
                group: results[2]._id,
                ...data
              })
      
              vote.save(err => {
                if (err) {
                  console.log(err)
                  next({ code: INTERNAL_SERVER_ERROR})
                } else {
                  console.log('vote was correctly saved')
                  res.status(CREATED)
                  next()
                }
              })
            }
          })
      }
    })
  

}