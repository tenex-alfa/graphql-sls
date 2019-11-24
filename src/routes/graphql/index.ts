// Import reflective typescript. Is required by many GraphQL libraries.
// should be made before any imports.
import "reflect-metadata";

import { allResolvers } from "./../../lib/models/index";
/**
 * @author Erik Rehn
 *
 * @description GraphQL endpoint which for Prometheus application
 * handles more or less all the logic associated with
 * promethues.
 */

// Import the builder from type-graphql
import { buildTypeDefsAndResolvers } from "type-graphql";

// Import apolloserver lambda edition.
import { ApolloServer } from "apollo-server-lambda";

/**
 * Function which build an apollo server handler
 * based on the event the context and the callback.
 *
 * Also parses the event to provide a context for
 * the GraphQL resolvers.
 *
 * @param event Should be the event provided by AWS lambda
 * @param _context Should be the context provided by AWS lambda
 * @param callback Should be the callback provided by AWS lambda
 * @Return a new apollo handler which creates a hooks up all the
 *         resolvers to a schema and provide context logic to such
 *         resolvers.
 *
 */
const createHandler = async (event: any, _context: any, callback: any) => {
  // Builds type definations and resolver to the
  // apollo server. Also emits a graphql shema
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: allResolvers,
    emitSchemaFile: "schema.gql"
  });

  // Creates an apollo server which
  // handles all the requests.
  const server = new ApolloServer({ typeDefs, resolvers });

  //   // Clears cache. This to ensure that the
  //   // data is always the most recent.
  //   cacheUtils.clear();

  // Returns the handler created by the server
  return server.createHandler();
};

// Creates an default export which is used as the handler
export default (event: any, context: any, callback: any) => {
  // Creates a new handler and return handler
  createHandler(event, context, callback).then((handler: any) =>
    handler(event, context, callback)
  );
};
