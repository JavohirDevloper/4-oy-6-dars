import { readFileSync } from "fs";
import { join } from "path";
import { pubsub } from "../../graphql/pubsub.js";
import { addMetro } from "./add-metro.js";
import { listMetros } from "./list-metros.js";
import { showMetro } from "./show-metro.js";
import { editMetro } from "./edit-metro.js";
import { removeMetro } from "./remove-metro.js";
import { listPaths } from "../paths/list-paths.js";

const typeDefs = readFileSync(
  join(process.cwd(), "src", "modules", "metros", "_schema.gql"),
  "utf8"
);
const resolvers = {
  Query: {
    metros: () => {
      return listMetros();
    },
    metro: (_, args) => {
      return showMetro({ id: args.id });
    },
  },
  Mutation: {
    createMetro: async (_, args) => {
      const result = await addMetro(args.input);

      pubsub.publish("METRO_CREATED", { metroCreated: result });

      return result;
    },
    updateMetro: (_, args) => {
      return editMetro({ id: args.id, ...args.input });
    },
    removeMetro: (_, args) => {
      return removeMetro({ id: args.id });
    },
  },
  Subscription: {
    metroCreated: { subscribe: () => pubsub.asyncIterator(["METRO_CREATED"]) },
  },
  Metro: {
    paths: (parent) => {
      return listPaths({ merto_id: parent.id });
    },
  },
};

export default { typeDefs, resolvers };
