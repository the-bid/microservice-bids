module.exports = {
  highestBid
}

async function highestBid(root, { auctionId, teamId }, context) {
  const bids = await context.prisma.bids({ where: { auctionId, teamId }, orderBy: 'amount_DESC' })
  if (!bids.length) {
    throw new Error('No bids')
  }
  return bids[0]
}
