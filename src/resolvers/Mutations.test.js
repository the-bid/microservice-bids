const jwt = require('jsonwebtoken')
const casual = require('casual')
const { createBid, deleteBid } = require('./Mutation')
const { getBidAmounts } = require('../../test/mock-data/factories')

describe('Mutation', () => {
  const context = {}
  let userId = null
  beforeEach(() => {
    userId = casual.uuid
    context.request = {
      headers: {
        authorization: `Bearer ${jwt.sign({ sub: userId }, 'secret')}`
      }
    }
  })
  afterEach(() => {
    delete context.request
    userId = null
  })
  describe('createBid', () => {
    let bids
    beforeEach(() => {
      bids = getBidAmounts()
      context.db = {
        query: {
          bids: jest.fn(() => bids)
        },
        mutation: {
          createBid: jest.fn()
        }
      }
    })
    afterEach(() => {
      delete context.db
      bids = null
    })
    test('db.mutation.createBid called with all required data', async () => {
      expect.assertions(1)
      const data = {
        amount: bids[0].amount + 1,
        auctionId: casual.uuid,
        teamId: casual.uuid,
        userId
      }
      await createBid({}, data, context, {})
      expect(context.db.mutation.createBid).toBeCalledWith({ data }, {})
    })
    test('db.mutation.createBid called with all required data when no bids exist for auction,team combo', async () => {
      expect.assertions(1)
      context.db.query.bids = jest.fn(() => [])
      const data = {
        amount: casual.double(0.1, 150),
        auctionId: casual.uuid,
        teamId: casual.uuid,
        userId
      }
      await createBid({}, data, context, {})
      expect(context.db.mutation.createBid).toBeCalledWith({ data }, {})
    })
    test('throw error when bid amount is less than the previous highest bid', async () => {
      expect.assertions(2)
      const data = {
        amount: bids[0].amount - 1,
        auctionId: casual.uuid,
        teamId: casual.uuid,
        userId
      }
      await expect(createBid({}, data, context, {})).rejects.toThrowError(
        'Bid amount must be greater than previous bids'
      )
      expect(context.db.mutation.createBid).not.toHaveBeenCalled()
    })
    test('throw error when bid amount is equal to the previous highest bid', async () => {
      expect.assertions(2)
      const data = {
        amount: bids[0].amount,
        auctionId: casual.uuid,
        teamId: casual.uuid,
        userId
      }
      await expect(createBid({}, data, context, {})).rejects.toThrowError(
        'Bid amount must be greater than previous bids'
      )
      expect(context.db.mutation.createBid).not.toHaveBeenCalled()
    })
  })
  describe('deleteBid', () => {
    let id
    beforeEach(() => {
      id = casual.uuid
      context.db = {
        query: {
          bid: jest.fn(() => ({ userId }))
        },
        mutation: {
          deleteBid: jest.fn()
        }
      }
    })
    afterEach(() => {
      id = null
      delete context.db
    })
    test('db.mutation.delete called with userId and id', async () => {
      expect.assertions(1)
      await deleteBid({}, { id }, context, {})
      expect(context.db.mutation.deleteBid).toBeCalledWith({ where: { id } }, {})
    })
    test('throw error if bid does not exist', async () => {
      expect.assertions(3)
      context.db.query.bid = jest.fn()
      await expect(deleteBid({}, { id }, context, {})).rejects.toThrowError('Bid does not exist')
      expect(context.db.query.bid).toBeCalledWith({ where: { id } }, `{userId}`)
      expect(context.db.mutation.deleteBid).not.toHaveBeenCalled()
    })
    test('throw error if user did not create bid', async () => {
      expect.assertions(2)
      context.request.headers.authorization = `Bearer ${jwt.sign({ sub: casual.uuid }, 'secret')}`
      await expect(deleteBid({}, { id }, context, {})).rejects.toThrowError('Must have created the bid to delete it')
      expect(context.db.mutation.deleteBid).not.toHaveBeenCalled()
    })
  })
})
