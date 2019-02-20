// This file is needed to define what to return for the Feed schema type (schema.graphlql)
// Any custom type that is not returning a simple Scalar type (String, Int, ID, etc.) needs a custom field definition to help Prisma figure out what column to pull data from

function links(parent, args, context){
	return context.prisma.feed({id: parent.id}).links()
}

function count(parent, args, context){
	return context.prisma.Feed({id: parent.id}).count()
}

module.exports = {
	links,
	count
}