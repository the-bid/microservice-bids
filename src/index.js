const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { PORT, PRISMA_ENDPOINT, PRISMA_SECRET, PRISMA_DEBUG } = require('../config')
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
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: PRISMA_ENDPOINT,
      secret: PRISMA_SECRET,
      debug: PRISMA_DEBUG
    })
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
