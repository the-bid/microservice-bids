const bidObjectTemplate = {
  id: expect.any(String),
  createdAt: expect.any(String),
  auctionId: expect.any(String),
  userId: expect.any(String),
  teamId: expect.any(String),
  amount: expect.any(Number)
}

function missingFieldErrorMessage({ method, field, type }) {
  return {
    message: `Field "${method}" argument "${field}" of type "${type}!" is required, but it was not provided.`
  }
}

module.exports = { bidObjectTemplate, missingFieldErrorMessage }
