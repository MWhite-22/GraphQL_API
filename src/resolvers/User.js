/*
This file is needed to define what to return for the "links" field in the User schema type (schema.graphlql)

Any custom type that is not returning a simple Scalar type (String, Int, ID, etc.) needs a custom field definition to help Prisma figure out what column to pull data from

Here, we are trying to return an object of another type (links returns object of type 'LINK'), and so we must define how Prisma should interpret that.

context.prisma.user(id) returns the individual user for the current search results id
links() is a Prisma defined promise that resolves to an array of objects in the links column from the db
*/

function links(parent, args, context){
	return context.prisma.user({id:parent.id}).links()
}

module.exports = {
	links
}