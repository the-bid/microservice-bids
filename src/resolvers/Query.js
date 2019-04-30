const Decimal = require('decimal.js')
const { getUserId } = require('../utils')

module.exports = {
  highestBid,
  userTotalBids
}

async function highestBid(root, { auctionId, teamId }, context) {
  const bids = await context.prisma.bids({ where: { auctionId, teamId }, orderBy: 'amount_DESC' })
  if (!bids.length) {
    throw new Error('No bids')
  }
  return bids[0]
}

async function userTotalBids(root, { auctionId, userId }, context) {
  if (!userId) {
    userId = getUserId(context.request)
  }
  const bids = await context.prisma.bids({ where: { auctionId, userId } })
  return bids.reduce((total, { amount }) => total.plus(amount), new Decimal(0.0)).toNumber()
}
