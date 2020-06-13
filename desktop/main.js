const path = require('path')
const { app, Menu, Tray } = require('electron')


let tray = null
app.on('ready', () => {

  function connectToServer() {
    console.log('trying connect to the server')
    const { net } = require('electron')

    const request = net.request('http://localhost:3333')

    request.setHeader("usertype", "desktop")
    request.setHeader("password", "batatateste")


    request.on("response", (response) => {
      response.on('data', (response) => {
        const ResponseObject = JSON.parse(`${response}`)
        console.log(ResponseObject.status)
      })
      response.on('end', () => {
      })
    })
    request.end()

  }

  function closeApp() {
    tray.destroy()
    app.quit()
  }

  tray = new Tray(path.resolve(__dirname, 'assets', 'icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Conectar', click: connectToServer },
    { label: 'Fechar', click: closeApp }
  ])
  tray.setToolTip('Teclado móvel')
  tray.setContextMenu(contextMenu)
})

