const {
  app,
  dialog,
  BrowserWindow,
  ipcMain: ipc
} = require('electron')

const config = require('./config')
const crypto = require('./crypto')

let mainWindow
app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 350,
		height: 600,
		webPreferences: {
			devTools: false
		},
		frame: false,
		resizable: false
	})
	mainWindow.loadURL(`file://${__dirname}/client.html`)

	mainWindow.on('closed', () => {
		mainWindow = null
	})
})

app.on('window-all-closed', () => {
	if (process.platform != 'darwin')
		app.quit()
})

ipc.on('load-config',(e,firstLoad)=>{
	config.read(configParams=>{
		if(configParams) crypto.configure(configParams)
		else if (!firstLoad) showErrorMSG('No se pudieron cargar parametros de configuracion')
		mainWindow.webContents.send('loaded', configParams, firstLoad)
	})
})

ipc.on('save-config',(e,data)=>{
	crypto.configure(data)
	config.save(data,(err)=>{
		if(err) showErrorMSG('Hubo un error al guardar la configuracion')
	})
	mainWindow.webContents.send('configured')
})

ipc.on('encrypt',(e,{key,text})=>{
	crypto.encrypt(key, text, (err, data) => {
		if (err){
			showErrorMSG('No se pudo encriptar: ',err)
		}else{
			const result = data.CiphertextBlob.toString('base64')
			mainWindow.webContents.send('encrypted', result)
		}
	})
})

ipc.on('decrypt',(e,{text})=>{
	crypto.decrypt(text, function(err, data) {
		if (err){
			showErrorMSG('No se pudo desencriptar: ',err)
		}else{
			const result = data.Plaintext
			mainWindow.webContents.send('decrypted', result)
		}
	})
})

function showErrorMSG(msg){
	dialog.showMessageBox(mainWindow,{type:'error',buttons:[],title:'ERROR',message:msg})
}
