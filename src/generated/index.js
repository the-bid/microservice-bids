'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const prisma_lib_1 = require('prisma-client-lib')
const typeDefs = require('./prisma-schema').typeDefs

const models = [
  {
    name: 'Bid',
    embedded: false
  }
]
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env['PRISMA_URL']}`,
  secret: `${process.env['PRISMA_MANAGEMENT_API_SECRET']}`
})
exports.prisma = new exports.Prisma()
