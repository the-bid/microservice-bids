const casual = require('casual')
const { highestBid } = require('./Query')
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
      await highestBid({}, args, context, {})
      expect(context.prisma.bids).toHaveBeenCalledWith({ where: args, orderBy: 'amount_DESC' })
    })
    test('retuns the first bid in the list returned from the db', async () => {
      expect.assertions(1)
      const args = {
        auctionId: casual.uuid,
        teamId: casual.uuid
      }
      const result = await highestBid({}, args, context, {})
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
})
