import { GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(graphqlAPI, {
  Headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
  }
});

export default graphQLClient;