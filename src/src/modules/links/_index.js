import { readFileSync } from "fs";
import { join } from "path";
import { pubsub } from "../../graphql/pubsub.js";
import { addStationLink } from "./add-station-link.js";
import { listStationLinks } from "./list-station-links.js";
import { showStationLink } from "./show-station-link.js";
import { editStationLink } from "./edit-station-link.js";
import { removeStationLink } from "./remove-station-link.js";
import { showStation } from "../stations/show-station.js";
import { showPath } from "../paths/show-path.js";
import { showPathLink } from "./show-path-link.js";
import { listPathLinks } from "./list-path-links.js";
import { editPathLink } from "./edit-path-link.js";
import { removePathLink } from "./remove-path-link.js";
import { addPathLink } from "./add-path-link.js";

const typeDefs = readFileSync(
  join(process.cwd(), "src", "modules", "links", "_schema.gql"),
  "utf8"
);
const resolvers = {
  Query: {
    stationLinks: () => {
      return listStationLinks();
    },
    stationLink: (_, args) => {
      return showStationLink({ id: args.id });
    },
    pathLinks: () => {
      return listPathLinks();
    },
    pathLink: (_, args) => {
      return showPathLink({ id: args.id });
    },
  },
  Mutation: {
    createStationLink: async (_, args) => {
      const result = await addStationLink(args.input);

      pubsub.publish("STATION_LINK_CREATED", { stationlinkCreated: result });

      return result;
    },
    updateStationLink: (_, args) => {
      return editStationLink({ id: args.id, ...args.input });
    },
    removeStationLink: (_, args) => {
      return removeStationLink({ id: args.id });
    },
    createPathLink: async (_, args) => {
      const result = await addPathLink(args.input);

      pubsub.publish("PATH_LINK_CREATED", { pathlinkCreated: result });

      return result;
    },
    updatePathLink: (_, args) => {
      return editPathLink({ id: args.id, ...args.input });
    },
    removePathLink: (_, args) => {
      return removePathLink({ id: args.id });
    },
  },
  Subscription: {
    stationlinkCreated: {
      subscribe: () => pubsub.asyncIterator(["STATION_LINK_CREATED"]),
    },
    pathLinkCreated: {
      subscribe: () => pubsub.asyncIterator(["PATH_LINK_CREATED"]),
    },
  },
  StationLink: {
    station: (parent) => {
      return showStation({ id: parent.station_id });
    },
    linked_station: (parent) => {
      return showStation({ id: parent.linked_id });
    },
  },
  PathLink: {
    path: (parent) => {
      return showPath({ id: parent.path_id });
    },
    linked_path: (parent) => {
      return showPath({ id: parent.linked_id });
    },
  },
};

export default { typeDefs, resolvers };
