// Main variables
import express from 'express'
import http from 'http';

import middlewares from './middlewares'
import { getStatusText } from 'http-status-codes'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
//import passport from './src/passport'
import {initDatabase, closeDatabase } from './db'
import {initSocket} from './socket'
import router from './router'

export const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}

const app = express()
const server = http.Server(app)

// Database
initDatabase()

//Configuration
app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
app.use(bodyParser.json())
app.use(helmet())
app.use(middlewares.sanitizer)
//app.use(passport.initialize())

// Web Sockets Configuration
app.use(initSocket(server))

// Router and formatters
app.use(middlewares.requestFormatter)
app.use('/api/v1', router)
app.use(middlewares.responseFormatter)

// Error handler
app.use(function (err, req, res, next) {
  console.log(err)
  if(err.hasOwnProperty('code')) {
    res.status(err.code)
    return res.json(err.hasOwnProperty('err') ? err.err : getStatusText(err.code))
  } else {
    res.status(500)
    return res.json(err)
  }
})

// Environment Configuration
const env = process.env
const IPADDR = env.IP
const PORT = env.PORT || 5000

// Run App
server.listen(5000, () =>
  console.log('Server is currently running at port 5000...')
)

server.on('close', function() {
  console.log(' Stopping ...')
})

process.on('SIGINT', function() {
  closeDatabase()
  server.close()
})

//Test export
export default app