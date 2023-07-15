import db from "../../db/index.js";

export const listPathLinks = (filter = {}) => {
  return db("path_links")
    .where({ ...filter })
    .select("*");
};
