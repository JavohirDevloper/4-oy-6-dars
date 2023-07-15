import db from "../../db/index.js";

export const addStationLink = async (payload) => {
  return db("station_path_links").insert(payload).returning("*");
};
