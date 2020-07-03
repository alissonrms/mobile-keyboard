import pystray
from PIL import Image
import socketio, requests, pywinauto, time


from os.path import abspath

def createSocketClient():
    io = socketio.Client()

    @io.event
    def connect():
        print("Connected to server")

    @io.event
    def disconnect():
        print("Disconnected from server")

 
    @io.event
    def connect_failed():
        print("Socket connection Failed")


    @io.event
    def command(commandToPerform):
        print(commandToPerform)
        pywinauto.keyboard.send_keys(commandToPerform)

    return io


def createApp(io):
    def connectToServer():
        url = 'http://localhost:3333'
        headers = {
          'usertype': 'desktop',
          'password': 'batatateste'
          }

        response = requests.get(url, headers=headers)

        jsonResponse = response.json()

        if (jsonResponse["status"] == 'permission accepted'):
          io.connect('http://localhost:3333')
        else:
          print(jsonResponse["status"])


    def disconnectFromServer(app):
        io.disconnect()
        app.stop()

    connectItem = pystray.MenuItem('Conectar', connectToServer)
    closeItem = pystray.MenuItem('Fechar', disconnectFromServer)

    menuApp = pystray.Menu(connectItem, closeItem)

    filename = abspath('assets/icon.png')
    iconImage = Image.open(filename)

    app = pystray.Icon('Mobile Keyboard', iconImage, menu=menuApp)

    return app

io = createSocketClient()

app = createApp(io)
app.run()
