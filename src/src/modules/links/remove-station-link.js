import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const removeStationLink = async ({ id }) => {
  const exsiting = await db("station_path_links").where({ id }).first();

  if (!exsiting) {
    throw new NotFoundError("StationLink not found");
  }

  return (
    await db("station_path_links").where({ id }).delete().returning("*")
  )[0];
};
