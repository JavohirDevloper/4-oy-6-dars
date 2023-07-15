import db from "../../db/index.js";

export const listStationLinks = (filter = {}) => {
  return db("station_path_links")
    .where({ ...filter })
    .select("*");
};
