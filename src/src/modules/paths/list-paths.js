import db from "../../db/index.js";

export const listPaths = (filter = {}) => {
  return db("paths")
    .where({ ...filter })
    .select("*");
};
