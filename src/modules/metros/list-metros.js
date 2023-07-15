import db from "../../db/index.js";

export const listMetros = (filter = {}) => {
  return db("metros")
    .where({ ...filter })
    .select("*");
};
