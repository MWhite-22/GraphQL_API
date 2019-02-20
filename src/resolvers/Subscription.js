// Still Magic at this time. Need to understand more


function newLinkSubscribe(parent, args, context, info){
	return context.prisma.$subscribe.link({mutation_in: ['CREATED']}).node()
}

const newLink = {
	subscribe: newLinkSubscribe,
	resolve: payload => payload
}

function newVoteSubcribe(par, arg, con, info){
	return con.prisma.$subscribe.vote({mutation_in: ['CREATED']}).node()
}

const newVote = {
	subscribe: newVoteSubcribe,
	resolve: payload => payload
}

module.exports = {
	newLink,
	newVote
}