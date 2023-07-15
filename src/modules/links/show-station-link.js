import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const showStationLink = async ({ id }) => {
  const exsiting = await db("station_path_links").where({ id }).first();

  if (!exsiting) {
    throw new NotFoundError("StationLink not Found");
  }

  return exsiting;
};
