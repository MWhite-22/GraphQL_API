const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

// ========================================
// Define Resolvers
// ========================================
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Link = require('./resolvers/Link')
const User = require('./resolvers/User')
const Vote = require('./resolvers/Vote')

const resolvers = {
	Query,
	Mutation,
	Subscription,
	Link,
	User,
	Vote
}

// ========================================
// Run Server and GraphQL IDE
// ========================================
const server = new GraphQLServer({
	typeDefs: './schema.graphql',
	resolvers,
	// Adds any HTTP request into the 'Context' object for use in the resolvers
	// or other server functions
	// Also adds any Prisma defined functions and commands into the same 'Context' object
	context: request => ({
		...request,
		prisma
	})
})

// eslint-disable-next-line no-console
server.start(() => console.log('Server is running on http://localhost:4000'))
