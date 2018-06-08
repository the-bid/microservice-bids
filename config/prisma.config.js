const configuration = {
  PRISMA_ENDPOINT: process.env.PRISMA_ENDPOINT,
  PRISMA_SECRET: process.env.PRISMA_SECRET,
  PRISMA_DEBUG: process.env.PRISMA_DEBUG || false
}

module.exports = configuration
