const {ipcRenderer: ipc, remote} = require('electron')

const configPanel= 'configPanel'
const encryptPanel = 'encryptPanel'

showConfig()

document.addEventListener('DOMContentLoaded', ()=>{
	ipc.send('load-config',true)
})

document.getElementById('config').addEventListener('click', () => {
	showConfig()
	ipc.send('load-config')
})

document.getElementById('encrypt').addEventListener('click', () => {
	const key = document.getElementById('key').value
	const text = document.getElementById('text').value
	ipc.send('encrypt',{key,text})
})

document.getElementById('decrypt').addEventListener('click', () => {
	const text = document.getElementById('text').value
	ipc.send('decrypt',{text})
})

document.getElementById('save').addEventListener('click', () => {
	const accessKeyId = document.getElementById('accessKeyId').value
	const secretAccessKey = document.getElementById('secretAccessKey').value
	const region = document.getElementById('region').value
	const params = {
		accessKeyId,
		secretAccessKey,
		region
	}
	ipc.send('save-config',params)
})

document.getElementById('exit').addEventListener('click', () => {
	let window = remote.getCurrentWindow()
	window.close()
})


ipc.on('encrypted',(e,data)=>{
	document.getElementById('result').value = `'{cipher}${data}'`
})

ipc.on('decrypted',(e,data)=>{
	document.getElementById('result').value = data
})

ipc.on('loaded',(e,params,firstLoad)=>{
	if(firstLoad && params){
		showEncrypt()
	}else if(params){
		const {accessKeyId,secretAccessKey,region}= params
		document.getElementById('accessKeyId').value=accessKeyId
		document.getElementById('secretAccessKey').value=secretAccessKey
		document.getElementById('region').value=region
	}
})

ipc.on('configured',()=>{
	showEncrypt()
})

function showConfig(){
	showPanel(configPanel)
	hidePanel(encryptPanel)
}

function showEncrypt(){
	showPanel(encryptPanel)
	hidePanel(configPanel)
}

function showPanel(panelId){
	document.getElementById(panelId).style.display='block'
	if(panelId==configPanel){
		document.getElementById('accessKeyId').value=''
		document.getElementById('secretAccessKey').value=''
		document.getElementById('region').value=''
	}
}

function hidePanel(panelId){
	document.getElementById(panelId).style.display='none'
}
