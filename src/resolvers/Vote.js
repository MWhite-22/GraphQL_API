// This file is needed to define what to return for the Vote schema type (schema.graphlql)
// Any custom type that is not returning a simple Scalar type (String, Int, ID, etc.) needs a custom field definition to help Prisma figure out what column to pull data from

function link(parent, args, context){
	return context.prisma.vote({id: parent.id}).link()
}

function user(parent, args, context){
	return context.prisma.vote({id: parent.id}).user()
}

module.exports = {
	link,
	user
}