const { ApolloServer, gql } = require("apollo-server-lambda");
const { RESTDataSource } = require('apollo-datasource-rest');

class CatFacts extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://cat-fact.herokuapp.com/facts';
  }

  async getRandomFact() {
    return this.get(`/random`);
  }

  async getSpecificFact(factID) {
    return this.get(`/${factID}`);
  }
}

const typeDefs = gql`
  type Fact {
    _id: String
    text: String
  }

  type Query {
    hello: String
    randomFact: Fact
    specificFact(factID: String): Fact
  }
`;
const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello, world!";
    },
    randomFact: async (_source, _args, { dataSources }) => {
      return dataSources.CatFacts.getRandomFact();
    },
    specificFact: async (_source, { factID }, { dataSources }) => {
      return dataSources.CatFacts.getSpecificFact(factID);
    }
  }  
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      CatFacts: new CatFacts()
    };
  },
});


exports.handler = server.createHandler();