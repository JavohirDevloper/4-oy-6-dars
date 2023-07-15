import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const showStation = async ({ id }) => {
  const station = await db("stations").where({ id }).first();

  if (!station) {
    throw new NotFoundError("Station not Found");
  }

  return station;
};
