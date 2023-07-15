import { readFileSync } from "fs";
import { join } from "path";
import { pubsub } from "../../graphql/pubsub.js";
import { addPath } from "./add-path.js";
import { listPaths } from "./list-paths.js";
import { showPath } from "./show-path.js";
import { editPath } from "./edit-path.js";
import { removePath } from "./remove-path.js";
import { showMetro } from "../metros/show-metro.js";
import { listPathLinks } from "../links/list-path-links.js";
import { listStations } from "../stations/list-stations.js";

const typeDefs = readFileSync(
  join(process.cwd(), "src", "modules", "paths", "_schema.gql"),
  "utf8"
);
const resolvers = {
  Query: {
    paths: () => {
      return listPaths();
    },
    path: (_, args) => {
      return showPath({ id: args.id });
    },
  },
  Mutation: {
    createPath: async (_, args) => {
      const result = await addPath(args.input);

      pubsub.publish("PATH_CREATED", { pathCreated: result });

      return result;
    },
    updatePath: (_, args) => {
      return editPath({ id: args.id, ...args.input });
    },
    removePath: (_, args) => {
      return removePath({ id: args.id });
    },
  },
  Subscription: {
    pathCreated: { subscribe: () => pubsub.asyncIterator(["PATH_CREATED"]) },
  },
  Path: {
    metro: (parent) => {
      return showMetro({ id: parent.metro_id });
    },
    links: (parent) => {
      return listPathLinks({ path_id: parent.id });
    },
    stations: (parent) => {
      return listStations({ path_id: parent.id });
    },
  },
};

export default { typeDefs, resolvers };
