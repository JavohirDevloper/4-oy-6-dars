import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const removePath = async ({ id }) => {
  const path = await db("paths").where({ id }).first();

  if (!path) {
    throw new NotFoundError("Path not found");
  }

  return (await db("paths").where({ id }).delete().returning("*"))[0];
};
