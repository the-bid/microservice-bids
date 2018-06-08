module.exports = {
  highestBid
}

async function highestBid(root, { userId, auctionId, teamId }, context, info) {
  const bids = await context.db.query.bids({ where: { AND: { userId, auctionId, teamId } }, orderBy: 'amount_DESC' })
  if (!bids.length) {
    throw new Error('No bids')
  }
  return bids[0]
}
