const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const { graphql } = require('graphql')
const { importSchema } = require('graphql-import')
const casual = require('casual')
const { bidObjectTemplate, missingFieldErrorMessage } = require('../../test/object-templates')

describe('Schema', () => {
  let schema = null
  beforeAll(() => {
    const typeDefs = importSchema(`${__dirname}/schema.graphql`)
    schema = makeExecutableSchema({ typeDefs })
    addMockFunctionsToSchema({
      schema,
      mocks: {
        DateTime: () => casual.moment.toISOString()
      }
    })
  })
  afterAll(() => {
    schema = null
  })
  describe('Query', () => {
    describe('highestBid', () => {
      test('returns a bid', async () => {
        expect.assertions(1)
        const query = `query highestBid{
          highestBid(auctionId:"${casual.uuid}",teamId:"${casual.uuid}",userId:"${casual.uuid}"){
            id
            createdAt
            auctionId
            userId
            teamId
            amount
          }
        }`
        const { data } = await graphql(schema, query)
        expect(data.highestBid).toMatchObject(bidObjectTemplate)
      })
      test('returns a GraphQLError for missing  required fields', async () => {
        expect.assertions(1)
        const query = `query highestBid{
          highestBid{
            id
          }
        }`
        const result = await graphql(schema, query)
        expect(result).toHaveProperty(
          'errors',
          expect.arrayContaining([
            expect.objectContaining(missingFieldErrorMessage({ method: 'highestBid', field: 'auctionId', type: 'ID' })),
            expect.objectContaining(missingFieldErrorMessage({ method: 'highestBid', field: 'userId', type: 'ID' })),
            expect.objectContaining(missingFieldErrorMessage({ method: 'highestBid', field: 'teamId', type: 'ID' }))
          ])
        )
      })
    })
  })
  describe('Mutation', () => {
    describe('createBid', () => {
      test('returns a bid', async () => {
        expect.assertions(1)
        const mutation = `mutation createBid{
          createBid(auctionId:"${casual.uuid}",teamId:"${casual.uuid}",amount:${casual.double(0.1, 150)}){
            id
            createdAt
            auctionId
            userId
            teamId
            amount
          }
        }`
        const { data } = await graphql(schema, mutation)
        expect(data.createBid).toMatchObject(bidObjectTemplate)
      })
      test('returns a GraphQLError for missing  required fields', async () => {
        expect.assertions(1)
        const mutation = `mutation createBid{
          createBid{
            id
            createdAt
            auctionId
            userId
            teamId
            amount
          }
        }`
        const result = await graphql(schema, mutation)
        expect(result).toHaveProperty(
          'errors',
          expect.arrayContaining([
            expect.objectContaining(missingFieldErrorMessage({ method: 'createBid', field: 'auctionId', type: 'ID' })),
            expect.objectContaining(missingFieldErrorMessage({ method: 'createBid', field: 'teamId', type: 'ID' })),
            expect.objectContaining(missingFieldErrorMessage({ method: 'createBid', field: 'amount', type: 'Float' }))
          ])
        )
      })
    })
    describe('deleteBid', () => {
      test('returns a bid', async () => {
        expect.assertions(1)
        const mutation = `mutation deleteBid{
          deleteBid(id:"${casual.uuid}"){
            id
            createdAt
            auctionId
            userId
            teamId
            amount
          }
        }`
        const { data } = await graphql(schema, mutation)
        expect(data.deleteBid).toMatchObject(bidObjectTemplate)
      })
      test('returns a GraphQLError for missing  required fields', async () => {
        expect.assertions(1)
        const mutation = `mutation deleteBid{
          deleteBid{
            id
            createdAt
            auctionId
            userId
            teamId
            amount
          }
        }`
        const result = await graphql(schema, mutation)
        expect(result).toHaveProperty(
          'errors',
          expect.arrayContaining([
            expect.objectContaining(missingFieldErrorMessage({ method: 'deleteBid', field: 'id', type: 'ID' }))
          ])
        )
      })
    })
  })
})
