/*
This file is needed to define what to return for the "createdBy" field
in the Link schema type (schema.graphlql)
Any custom type that is not returning a simple Scalar type (String, Int, ID, etc.)
needs a custom field definition to help Prisma figure out what column to pull data from
*/

// Here, we are trying to return an object of another type (createdBy returns object of type 'USER')
// and so we must define how Prisma should interpret that.
// context.prisma.link(id) returns the individual link for the current search results id,
// createdBy() is a Prisma defined promise that resolves to the createdBy column from the db
function createdBy(parent, args, context) {
  return context.prisma.link({ id: parent.id }).createdBy();
}

function votes(parent, args, context) {
  return context.prisma.link({ id: parent.id }).votes();
}

module.exports = {
  createdBy,
  votes,
};
