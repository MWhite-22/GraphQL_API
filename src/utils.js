const jwt = require('jsonwebtoken');
const APP_SECRET = 'SUPER Secret P@ssword for Dat 3ncrypt Lyfe!' //Defines how we encrypt and decrypt our JSONWebTokens | SUPER SECRET!!!

function getUserId(context){
	const Authorization = context.request.get('Authorization') // Grabs the HTTP headers and searches for a "Authorization" key which we expect to hold a JWT
	if (Authorization){
		const token = Authorization.replace('Bearer ', ''); // If the key exists, remove the 'Bearer ' string that will preface the JWT
		const {userId} = jwt.verify(token, APP_SECRET); // Create a userId object that holds the verified JWT, decrypted with our APP_SECRET string
		return userId; // Return that userId object
	}

	throw new Error('Not authenticated'); // If we didnt find the Authorization header, or something else kicked us out of the verify loop, throw an error
}

module.exports = {
	APP_SECRET,
	getUserId
}