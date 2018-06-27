const casual = require('casual')
const { highestBid } = require('./Query')
const { getBidAmounts } = require('../../test/mock-data/factories')

describe('Query', () => {
  const context = {}
  describe('highestBid', () => {
    let bids
    beforeEach(() => {
      bids = getBidAmounts()
      context.db = {
        query: {
          bids: jest.fn(() => bids)
        }
      }
    })
    afterEach(() => {
      delete context.db
      bids = null
    })
    test('calls db.query.bids with correct arguments and orderBy', async () => {
      expect.assertions(1)
      const args = {
        auctionId: casual.uuid,
        teamId: casual.uuid
      }
      await highestBid({}, args, context, {})
      expect(context.db.query.bids).toBeCalledWith({ where: { AND: args }, orderBy: 'amount_DESC' }, {})
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
      context.db.query.bids = jest.fn(() => [])
      expect.assertions(1)
      const args = {
        auctionId: casual.uuid,
        teamId: casual.uuid
      }
      await expect(highestBid({}, args, context, {})).rejects.toThrowError('No bids')
    })
  })
})
