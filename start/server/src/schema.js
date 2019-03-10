const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
    launches(
        """
        The number of results to show. Must be >= 1. Default = 20
        """
        pageSize: Int
        """
        If you add a corsor here. it will only return results _afer_ this cursor
        """
        after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
    me: User
}
"""
Simple wraper around our list of launches that contains a cursor to the
last time in the list. Pass this cursor to the launches query to fetch results
after these.
"""
type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
}

type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
}

type Rocket {
    id: ID!
    name: String
    type: String
}

type User {
    id: ID!
    email: String!
    trips: [Launch]!
}

type Mission {
    name: String
    missionPatch(size: PatchSize): String
}

enum PatchSize {
    SMALL
    LARGE
}

type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancleTrip(launchId: ID): TripUpdateResponse!
    login(email: String): String
}

type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
}
`;

module.exports = typeDefs;
