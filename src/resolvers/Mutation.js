const { toLower } = require('lodash')
const { getUserId } = require('../utils')
const { highestBid } = require('./Query')

module.exports = {
  createBid,
  deleteBid
}

async function createBid(root, { auctionId, teamId, amount }, context, info) {
  const userId = getUserId(context.request)
  try {
    const previousHighestBid = await highestBid(root, { auctionId, teamId, userId }, context, `{amount}`)
    if (previousHighestBid && amount <= previousHighestBid.amount) {
      throw new Error('Bid amount must be greater than previous bids')
    }
  } catch (e) {
    if (toLower(e.message) !== 'no bids') {
      throw e
    }
  }
  return context.db.mutation.createBid(
    {
      data: {
        auctionId,
        teamId,
        userId,
        amount
      }
    },
    info
  )
}

async function deleteBid(root, { id }, context, info) {
  const userId = getUserId(context.request)
  const bidToDelete = await context.db.query.bid({ where: { id } }, `{userId}`)
  if (!bidToDelete) {
    throw new Error('Bid does not exist')
  }
  if (userId !== bidToDelete.userId) {
    throw new Error('Must have created the bid to delete it')
  }
  return context.db.mutation.deleteBid({ where: { id } }, info)
}
