import db from "../../db/index.js";
import bcryptjs from "bcryptjs";
import { NotFoundError } from "../../shared/errors/index.js";

export const editPathLink = async ({ id, ...changes }) => {
  const station = await db("path_links").where({ id }).first();

  if (!station) {
    throw new NotFoundError("PathLink not found");
  }
  let hashPassword = {};
  if (changes.password) {
    hashPassword.password = await bcryptjs.hash(changes.password, 10);
  }
  return (
    await db("path_links")
      .where({ id })
      .update({ ...changes, ...hashPassword })
      .returning("*")
  )[0];
};
