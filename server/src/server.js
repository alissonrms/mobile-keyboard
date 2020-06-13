const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.json())

app.get('/', (request, response) => {
  const usertype = request.headers.usertype
  const password = request.headers.password

  console.log(usertype)
  console.log(password)

  if (usertype == 'mobile' && password == 'batatateste') {

    console.log("mobile phone connected")
    return response.json({
      status: "user connected"
    })

  } else if (usertype == 'desktop' && password == 'batatateste') {

    console.log("desktop app connected")
    return response.json({
      status: "user connected"
    })

  } else {
    console.log("connection refused")
    return response.json({
      status: "connection refused"
    })

  }  
})

io.on('connection', (socket) => {
  console.log('user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('command', (keyPressed) => {
    console.log(`Key pressed: ${keyPressed}`)
    io.emit('pressKey', keyPressed)
  })
})


http.listen(3333)

