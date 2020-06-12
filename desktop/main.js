const path = require('path')
const { app, Menu, Tray } = require('electron')



let tray = null
app.on('ready', () => {
  function connectToServer(){
    console.log('conectar ao servidor')
  }
  
  function closeApp(){
    tray.destroy()
    app.quit() 
  }

  tray = new Tray(path.resolve(__dirname, 'assets', 'icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Conectar', click: connectToServer},
    { label: 'Fechar', click: closeApp}
  ])
  tray.setToolTip('Teclado móvel')
  tray.setContextMenu(contextMenu)
})

