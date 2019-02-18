const { GraphQLServer } = require('graphql-yoga');

// ========================================
// 		Define the method of resolving querys
// ========================================
const resolvers = {
	Query: {
		info: ()=> 'This is the API of a Hackernews Clone',
		feed: (root, args, context, info)=>{
			return context.prisma.links()
			}	
	},

	Mutation: {
		post: (root, args, context)=>{
			return context.prisma.createLink({
				url: args.url,
				description: args.description
			})
		}
	},

	Link: {
		id: 		(parent) => parent.id,
		url: 		(parent) => parent.url,
		description:(parent) => parent.description
	}
}

// ========================================
// 			Run Server and GraphQL IDE
// ========================================
const server = new GraphQLServer({
	typeDefs: `./src/schema.graphql`,
	resolvers,
})

server.start(()=>console.log(`Server is running on http://localhost:4000`));