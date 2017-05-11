const crypto = require('./crypto')

document.getElementById('config').addEventListener('click', () => {
	const accessKeyId = document.getElementById('accessKeyId').value
	const secretAccessKey = document.getElementById('secretAccessKey').value
	const region = document.getElementById('region').value
	crypto.configure({
		accessKeyId,
		secretAccessKey,
		region
	})
})

document.getElementById('encrypt').addEventListener('click', () => {
	const key = document.getElementById('key').value
	const text = document.getElementById('text').value
	crypto.encrypt(key, text, function(err, data) {
		let result
		if (err) result = err
		else result = data.CiphertextBlob.toString('base64')
		document.getElementById('result').value = result
	})
})

document.getElementById('decrypt').addEventListener('click', () => {
	const text = document.getElementById('text').value
	crypto.decrypt(text, function(err, data) {
		let result
		if (err) result = err
		else result = data.Plaintext
		document.getElementById('result').value = result
	})
})
