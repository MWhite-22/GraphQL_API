const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils'); //See utils.js for explanation

async function signup(parent, args, context, info){
	// Use BCrypt to encrypt our user's provided password from the args object. Await the results
	const password = await bcrypt.hash(args.password, 10) 
	// Create a user using the Prisa defined createUser function. {...args} destructures args into an array key:value pairs, then we include our new password variable. 
	// If the key string is equal to the name of the value variable, we only have to input the value variable. 
	// Here, the variable named 'password' uses the key string we would use to instatiate that object anyways {password: password}. As such, only the variable is required.
	const user =  await context.prisma.createUser({...args, password})
	// Create a JSON Web Token from the newly created user's id and the APP_SECRET string
	const token = jwt.sign({ userId: user.id }, APP_SECRET)
	// Return two items as dictated in the schema.graphql file
	// Remember, this mutation is returning a type:AuthPayload and should adhere to that schema definition
	return {
		token,
		user
	}
}

async function login(parent, args, context, info){
	// Find a user using the Prisma defined .user function. 
	// Inputs are any @unique field from the User schema type (ID, Email)
	// As we dont expect the user to type out their UUID every time, we look for users where the email mathces the input argument (args.email)
	const user = await context.prisma.user({ email: args.email })
	// If we dont find one, throw an Error and kick the process out of this function
	if (!user){
		throw new Error('No User Found')
	}
	// If we made it here, we found a user. 
	// Now we want to validate the input password (args.password) with the hashed password in the db for the found user.
	const valid = await bcrypt.compare(args.password, user.password)
	// If they dont match, throw an Error and kick the process out of this function
	if(!valid){
		throw new Error('Password Invalid')
	}
	// If we made it here, we found a user and the input password is equal to their db stored password
	// Create a JSON Web Token for this user, using the APP_SECRET string
	const token = jwt.sign({ userId: user.id }, APP_SECRET)
	// Return two items as dictated in the schema.graphql file
	// Remember, this mutation is returning a type:AuthPayload and should adhere to that schema definition
	return {
		token,
		user
	}
}

function post(parent, args, context, info){
	// Use the getUserId function from ./utils to find the JWT and confirm the user's id
	// We do this so that we can record who created something without the user having to enter their information, or anyone elses info, every time
	const userId = getUserId(context)
	// Use the Prisma defined createLink function, passing in an object where the values are being filled with the input arguments
	return context.prisma.createLink({
		url: args.url,
		description: args.description,
		// This gets a little tricky, but essentially, the createdBy field is an object that connects the post to a single User
		// Here we say createdBy is equal to an object. In that object, we want to connect to another schema type, which Prisma thinks should be of type User based on schema.graphql
		// We connect the schemas where the User.id is equal to the userId returned from our ./utils function getUserId
		createdBy: { connect: {id: userId}}
	})
}

module.exports = {
	signup,
	login,
	post
}