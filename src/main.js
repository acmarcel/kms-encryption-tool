const {
  app,
  BrowserWindow
} = require('electron')

const config = require('./config')

let mainWindow
app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 600,
		height: 400,
		webPreferences: {
			devTools: false
		}
	})
	mainWindow.loadURL(`file://${__dirname}/client.html`)
	mainWindow.on('closed', () => {
		mainWindow = null
	})
})

app.on('configure',(evt,data)=>{
	const dirPath=`file://${__dirname}`
	config.save(dirPath,data)
})
