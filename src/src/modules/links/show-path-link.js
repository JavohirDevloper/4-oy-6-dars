import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const showPathLink = async ({ id }) => {
  const station = await db("path_links").where({ id }).first();

  if (!station) {
    throw new NotFoundError("PathLink not Found");
  }

  return station;
};
