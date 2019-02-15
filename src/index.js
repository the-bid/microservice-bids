const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated')
const { PORT } = require('../config')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

const resolvers = {
  Query,
  Mutation
}

const server = new GraphQLServer({
  typeDefs: __dirname + '/schemas/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma
  })
})
/* eslint-disable no-console */
server.start(
  {
    port: PORT
  },
  () => console.log(`the-bid-auctions is running on port: ${PORT}`)
)
/* eslint-enable no-console */
