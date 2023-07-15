import db from "../../db/index.js";

export const addPathLink = async (payload) => {
  return db("path_links").insert(payload).returning("*");
};
