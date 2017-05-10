const AWS = require('aws-sdk/dist/aws-sdk-react-native')
let kms

exports.configure = (params) => {
	kms = new AWS.KMS(params)
}

exports.encrypt = (key, data, callback) => {
	let params = {
		KeyId: key,
		Plaintext: data
	}
	kms.encrypt(params, callback)
}

exports.decrypt = (data, callback) => {
	let params = {
		CiphertextBlob: Buffer.from(data, 'base64')
	}
	kms.decrypt(params, callback)
}
