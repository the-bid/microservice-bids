module.exports = {
  typeDefs: /* GraphQL */ `
    type AggregateBid {
      count: Int!
    }

    type BatchPayload {
      count: Long!
    }

    type Bid {
      id: ID!
      createdAt: DateTime!
      userId: String!
      auctionId: String!
      teamId: String!
      amount: Float!
    }

    type BidConnection {
      pageInfo: PageInfo!
      edges: [BidEdge]!
      aggregate: AggregateBid!
    }

    input BidCreateInput {
      userId: String!
      auctionId: String!
      teamId: String!
      amount: Float!
    }

    type BidEdge {
      node: Bid!
      cursor: String!
    }

    enum BidOrderByInput {
      id_ASC
      id_DESC
      createdAt_ASC
      createdAt_DESC
      userId_ASC
      userId_DESC
      auctionId_ASC
      auctionId_DESC
      teamId_ASC
      teamId_DESC
      amount_ASC
      amount_DESC
      updatedAt_ASC
      updatedAt_DESC
    }

    type BidPreviousValues {
      id: ID!
      createdAt: DateTime!
      userId: String!
      auctionId: String!
      teamId: String!
      amount: Float!
    }

    type BidSubscriptionPayload {
      mutation: MutationType!
      node: Bid
      updatedFields: [String!]
      previousValues: BidPreviousValues
    }

    input BidSubscriptionWhereInput {
      mutation_in: [MutationType!]
      updatedFields_contains: String
      updatedFields_contains_every: [String!]
      updatedFields_contains_some: [String!]
      node: BidWhereInput
      AND: [BidSubscriptionWhereInput!]
      OR: [BidSubscriptionWhereInput!]
      NOT: [BidSubscriptionWhereInput!]
    }

    input BidUpdateInput {
      userId: String
      auctionId: String
      teamId: String
      amount: Float
    }

    input BidUpdateManyMutationInput {
      userId: String
      auctionId: String
      teamId: String
      amount: Float
    }

    input BidWhereInput {
      id: ID
      id_not: ID
      id_in: [ID!]
      id_not_in: [ID!]
      id_lt: ID
      id_lte: ID
      id_gt: ID
      id_gte: ID
      id_contains: ID
      id_not_contains: ID
      id_starts_with: ID
      id_not_starts_with: ID
      id_ends_with: ID
      id_not_ends_with: ID
      createdAt: DateTime
      createdAt_not: DateTime
      createdAt_in: [DateTime!]
      createdAt_not_in: [DateTime!]
      createdAt_lt: DateTime
      createdAt_lte: DateTime
      createdAt_gt: DateTime
      createdAt_gte: DateTime
      userId: String
      userId_not: String
      userId_in: [String!]
      userId_not_in: [String!]
      userId_lt: String
      userId_lte: String
      userId_gt: String
      userId_gte: String
      userId_contains: String
      userId_not_contains: String
      userId_starts_with: String
      userId_not_starts_with: String
      userId_ends_with: String
      userId_not_ends_with: String
      auctionId: String
      auctionId_not: String
      auctionId_in: [String!]
      auctionId_not_in: [String!]
      auctionId_lt: String
      auctionId_lte: String
      auctionId_gt: String
      auctionId_gte: String
      auctionId_contains: String
      auctionId_not_contains: String
      auctionId_starts_with: String
      auctionId_not_starts_with: String
      auctionId_ends_with: String
      auctionId_not_ends_with: String
      teamId: String
      teamId_not: String
      teamId_in: [String!]
      teamId_not_in: [String!]
      teamId_lt: String
      teamId_lte: String
      teamId_gt: String
      teamId_gte: String
      teamId_contains: String
      teamId_not_contains: String
      teamId_starts_with: String
      teamId_not_starts_with: String
      teamId_ends_with: String
      teamId_not_ends_with: String
      amount: Float
      amount_not: Float
      amount_in: [Float!]
      amount_not_in: [Float!]
      amount_lt: Float
      amount_lte: Float
      amount_gt: Float
      amount_gte: Float
      AND: [BidWhereInput!]
      OR: [BidWhereInput!]
      NOT: [BidWhereInput!]
    }

    input BidWhereUniqueInput {
      id: ID
    }

    scalar DateTime

    scalar Long

    type Mutation {
      createBid(data: BidCreateInput!): Bid!
      updateBid(data: BidUpdateInput!, where: BidWhereUniqueInput!): Bid
      updateManyBids(data: BidUpdateManyMutationInput!, where: BidWhereInput): BatchPayload!
      upsertBid(where: BidWhereUniqueInput!, create: BidCreateInput!, update: BidUpdateInput!): Bid!
      deleteBid(where: BidWhereUniqueInput!): Bid
      deleteManyBids(where: BidWhereInput): BatchPayload!
    }

    enum MutationType {
      CREATED
      UPDATED
      DELETED
    }

    interface Node {
      id: ID!
    }

    type PageInfo {
      hasNextPage: Boolean!
      hasPreviousPage: Boolean!
      startCursor: String
      endCursor: String
    }

    type Query {
      bid(where: BidWhereUniqueInput!): Bid
      bids(
        where: BidWhereInput
        orderBy: BidOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): [Bid]!
      bidsConnection(
        where: BidWhereInput
        orderBy: BidOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): BidConnection!
      node(id: ID!): Node
    }

    type Subscription {
      bid(where: BidSubscriptionWhereInput): BidSubscriptionPayload
    }
  `
}
