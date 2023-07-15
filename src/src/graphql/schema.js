import { makeExecutableSchema } from "@graphql-tools/schema";
import metroModule from "../modules/metros/_index.js";
import linkModule from "../modules/links/_index.js";
import stationModule from "../modules/stations/_index.js";
import pathModule from "../modules/paths/_index.js";

export const schema = makeExecutableSchema({
  typeDefs: [
    metroModule.typeDefs,
    linkModule.typeDefs,
    stationModule.typeDefs,
    pathModule.typeDefs,
  ],
  resolvers: [
    metroModule.resolvers,
    linkModule.resolvers,
    stationModule.resolvers,
    pathModule.resolvers,
  ],
});
