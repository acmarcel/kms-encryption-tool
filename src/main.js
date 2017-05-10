const {
  app,
  BrowserWindow
} = require('electron')

let mainWindow
app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 600,
		height: 400
	})
	mainWindow.loadURL(`file://${__dirname}/client.html`)
	mainWindow.on('closed', () => {
		mainWindow = null
	})
})
