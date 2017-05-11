const fs = require('fs')
const path = require('path')


exports.save = (dirPath, data,callback)=>{
	const configPath=path.join(dirPath,'config.json')
	fs.writeFile(configPath,data,callback)
}
