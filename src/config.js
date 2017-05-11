const fs = require('fs')

const filename = 'config.json'

exports.read = (callback)=>{
	fs.stat(filename,(err,stats)=>{
		if(stats && stats.isFile()){
			fs.readFile(filename,'utf8',(err,data)=>{
				const params=data?JSON.parse(data):null
				callback(params)
			})
		}else{
			callback(null)
		}
	})
}

exports.save = (data,callback)=>{
	const content = JSON.stringify(data)
	fs.writeFile(filename,content,callback)
}
