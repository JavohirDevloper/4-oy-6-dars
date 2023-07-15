import db from "../../db/index.js";

export const addStation = async (payload) => {
  return db("stations").insert(payload).returning("*");
};
