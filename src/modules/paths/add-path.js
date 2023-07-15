import db from "../../db/index.js";

export const addPath = async (payload) => {
  return db("paths").insert(payload).returning("*");
};
