const { toLower } = require('lodash')
const { getUserId } = require('../utils')
const { highestBid } = require('./Query')

module.exports = {
  createBid,
  deleteBid
}

async function createBid(root, { auctionId, teamId, amount }, context) {
  const userId = getUserId(context.request)
  try {
    const previousHighestBid = await highestBid(root, { auctionId, teamId, userId }, context)
    if (previousHighestBid && amount <= previousHighestBid.amount) {
      throw new Error('Bid amount must be greater than previous bids')
    }
  } catch (e) {
    if (toLower(e.message) !== 'no bids') {
      throw e
    }
  }
  return context.prisma.createBid({
    auctionId,
    teamId,
    userId,
    amount
  })
}

async function deleteBid(root, { id }, context) {
  const userId = getUserId(context.request)
  const bidToDelete = await context.prisma.bid({ id })
  if (!bidToDelete) {
    throw new Error('Bid does not exist')
  }
  if (userId !== bidToDelete.userId) {
    throw new Error('Must have created the bid to delete it')
  }
  return context.prisma.deleteBid({ id })
}
