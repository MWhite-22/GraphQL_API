function info() {
  // Return a string if a user queries "info" from the root {Query{info}}
  return 'A simple HackerNews clone, made with GraphQL';
}

async function feed(root, args, context) {
  // If the query came with filter arguments, build a where object that uses
  // the filter arg as a search against description OR url
  // If no filter argument, set where equal to an empty object
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter },
      { url_contains: args.filter },
    ],
  } : {};
  // Use our where object to filter the returned links array
  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  });

  const count = await context.prisma.linksConnection({ where }).aggregate().count();
  return {
    links,
    count,
  };
}

function link(root, args, context) {
  // Create a variable fro the args.linkId input
  const { linkId } = args;
  // Find the single link where the id = our linkId variable
  // To find one, we must filter (WHERE) by a @unique value as defined in the schema.graphql
  return context.prisma.link({ id: linkId });
}

module.exports = {
  info,
  feed,
  link,
};
