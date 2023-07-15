import { readFileSync } from "fs";
import { join } from "path";
import { pubsub } from "../../graphql/pubsub.js";
import { addStation } from "./add-station.js";
import { listStations } from "./list-stations.js";
import { showStation } from "./show-station.js";
import { editStation } from "./edit-station.js";
import { removeStation } from "./remove-station.js";
import { listStationLinks } from "../links/list-station-links.js";

const typeDefs = readFileSync(
  join(process.cwd(), "src", "modules", "stations", "_schema.gql"),
  "utf8"
);
const resolvers = {
  Query: {
    stations: () => {
      return listStations();
    },
    station: (_, args) => {
      return showStation({ id: args.id });
    },
  },
  Mutation: {
    createStation: async (_, args) => {
      const result = await addStation(args.input);

      pubsub.publish("METRO_CREATED", { stationCreated: result });

      return result;
    },
    updateStation: (_, args) => {
      return editStation({ id: args.id, ...args.input });
    },
    removeStation: (_, args) => {
      return removeStation({ id: args.id });
    },
  },
  Subscription: {
    stationCreated: {
      subscribe: () => pubsub.asyncIterator(["METRO_CREATED"]),
    },
  },
  Station: {
    links: (parent) => {
      return listStationLinks({ station_id: parent.id });
    },
    forward: (parent) => {
      return showStation({ forward_id: parent.id });
    },
    backward: (parent) => {
      return showStation({ backward_id: parent.id });
    },
  },
};

export default { typeDefs, resolvers };
