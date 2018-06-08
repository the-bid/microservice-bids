const prismaConfig = require('./prisma.config')
const serviceConfig = require('./service.config')

module.exports = {
  ...prismaConfig,
  ...serviceConfig
}
