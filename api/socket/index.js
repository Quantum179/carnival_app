import SocketIO from 'socket.io'

export const initSocket = (server) => {
  const io = new SocketIO(server)
  io.set('origins', 'http://localhost:8080')
  io.on('connection', (socket) => {
    console.log('a new socket client is connected')
    // socket.on('my other event', function (data) {
    //   console.log(data);
    // })
  })

  return (req, res, next) => {
    req.io = io
    next()
  }
}