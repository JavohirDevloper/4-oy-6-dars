import db from "../../db/index.js";

export const listStations = (filter = {}) => {
  return db("stations")
    .where({ ...filter })
    .select("*");
};
