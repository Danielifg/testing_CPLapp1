const { ApolloServer, gql } = require('apollo-server');
const graphql = require('graphql');
const {JOB_DETAILS, JOB_MASTER}  = require('./SampleData/sampleTables.js')
const { typeDefs } = require ('./schemas.js')
//const { res } = require('./MySQL.js')

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
//console.log("apollo --> ", res())

const resolvers = {
  Query: {
    getJobs: (from,to) => JOB_MASTER
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
        typeDefs,
        resolvers
    });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
