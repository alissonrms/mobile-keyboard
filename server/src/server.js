const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.json())

app.get('/', (request, response) => {
  const usertype = request.headers.usertype
  const password = request.headers.password

  if (usertype == 'mobile' && password == 'batatateste') {
    console.log("mobile phone request")
    return response.json({
      status: "permission accepted"
    })

  } else if (usertype == 'desktop' && password == 'batatateste') {
    console.log("desktop app request")
    return response.json({
      status: "permission accepted"
    })

  } else {
    console.log("connection refused")
    return response.json({
      status: "connection refused"
    })
  }
})

app.get('/test', (req, res) => {
  res.sendFile(__dirname + '/test.html');
})

io.on('connection', (socket) => {
  console.log('connection stabilizaded')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('keyPressed', (commandToPerform) => {
    console.log(`Key pressed: ${commandToPerform}`)
    io.emit('command', commandToPerform)
  })
})


http.listen(3333)

