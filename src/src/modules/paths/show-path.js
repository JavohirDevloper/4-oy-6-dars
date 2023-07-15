import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const showPath = async ({ id }) => {
  const path = await db("paths").where({ id }).first();

  if (!path) {
    throw new NotFoundError("Path not Found");
  }

  return path;
};
