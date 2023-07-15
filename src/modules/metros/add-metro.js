import db from "../../db/index.js";

export const addMetro = async (payload) => {
  return db("metros").insert(payload).returning("*");
};
