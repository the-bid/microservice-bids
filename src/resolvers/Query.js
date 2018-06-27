module.exports = {
  highestBid
}

async function highestBid(root, { auctionId, teamId }, context, info) {
  const bids = await context.db.query.bids({ where: { AND: { auctionId, teamId } }, orderBy: 'amount_DESC' }, info)
  if (!bids.length) {
    throw new Error('No bids')
  }
  return bids[0]
}
