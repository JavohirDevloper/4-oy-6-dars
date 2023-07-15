import db from "../../db/index.js";
import bcryptjs from "bcryptjs";
import { NotFoundError } from "../../shared/errors/index.js";

export const editStationLink = async ({ id, ...changes }) => {
  const exsiting = await db("station_path_links").where({ id }).first();

  if (!exsiting) {
    throw new NotFoundError("StationLink not found");
  }
  let hashPassword = {};
  if (changes.password) {
    hashPassword.password = await bcryptjs.hash(changes.password, 10);
  }
  return (
    await db("station_path_links")
      .where({ id })
      .update({ ...changes, ...hashPassword })
      .returning("*")
  )[0];
};
