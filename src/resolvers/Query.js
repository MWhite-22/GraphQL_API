function info(){
	// Return a string if a user queries "info" from the root {Query{info}}
	return 'A simple HackerNews clone, made with GraphQL'
}

function feed(root, args, context, info) {
	// Return an array of all Links using the Prisma defined .links() function
	// We could expand this to pass in several arguments to decided the WHERE, ORDER, LIMIT, OFFSET, etc. of the returned array
	return context.prisma.links()
}

function link(root, args, context, info){
	// Create a variable fro the args.linkId input
	const linkId = args.linkId;
	// Find the single link where the id = our linkId variable
	// To find one, we must filter (WHERE) by a @unique value as defined in the schema.graphql
	return context.prisma.link({id: linkId});
}

module.exports = {
	info,
	feed,
	link,
}