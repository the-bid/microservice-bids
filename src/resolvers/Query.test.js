const casual = require('casual')
const jwt = require('jsonwebtoken')
const Decimal = require('decimal.js')
const { highestBid, userTotalBids } = require('./Query')
const { getBidAmounts } = require('../../test/mock-data/factories')

describe('Query', () => {
  const context = {}
  describe('highestBid', () => {
    let bids
    beforeEach(() => {
      bids = getBidAmounts()
      context.prisma = {
        bids: jest.fn(() => bids)
      }
    })
    afterEach(() => {
      delete context.prisma
      bids = null
    })
    test('calls prisma.bids with correct arguments and orderBy', async () => {
      expect.assertions(1)
      const args = {
        auctionId: casual.uuid,
        teamId: casual.uuid
      }
      await highestBid({}, args, context)
      expect(context.prisma.bids).toHaveBeenCalledWith({ where: args, orderBy: 'amount_DESC' })
    })
    test('retuns the first bid in the list returned from the db', async () => {
      expect.assertions(1)
      const args = {
        auctionId: casual.uuid,
        teamId: casual.uuid
      }
      const result = await highestBid({}, args, context)
      expect(result).toMatchObject(bids[0])
    })
    test('throws error when there are no bids', async () => {
      context.prisma.bids = jest.fn(() => [])
      expect.assertions(1)
      const args = {
        auctionId: casual.uuid,
        teamId: casual.uuid
      }
      await expect(highestBid({}, args, context)).rejects.toThrow('No bids')
    })
  })
  describe('userTotalBids', () => {
    let bids
    beforeEach(() => {
      bids = getBidAmounts()
      context.prisma = {
        bids: jest.fn(() => bids)
      }
    })
    afterEach(() => {
      delete context.prisma
      bids = null
    })
    test('calls prisma.bids with correct arguments', async () => {
      expect.assertions(1)
      const args = {
        auctionId: casual.uuid,
        userId: casual.uuid
      }
      await userTotalBids({}, args, context)
      expect(context.prisma.bids).toHaveBeenCalledWith({ where: args })
    })
    test('calls prisma.bids with correct arguments if userId not provided', async () => {
      context.prisma.bids = jest.fn(() => [])
      const userId = casual.uuid
      context.request = {
        headers: {
          authorization: `Bearer ${jwt.sign({ sub: userId }, 'secret')}`
        }
      }
      expect.assertions(1)
      const args = {
        auctionId: casual.uuid
      }
      await userTotalBids({}, args, context)
      expect(context.prisma.bids).toHaveBeenCalledWith({ where: { ...args, userId } })
    })
    test('retuns the total amount of the bids', async () => {
      expect.assertions(2)
      const args = {
        auctionId: casual.uuid,
        userId: casual.uuid
      }
      const expectedTotal = bids.reduce((total, { amount }) => total.plus(amount), new Decimal(0.0)).toNumber()
      const result = await userTotalBids({}, args, context)
      expect(result).toEqual(expectedTotal)
      expect(result.toString()).toMatch(/^\d+\.\d{0,2}$/)
    })
  })
})
