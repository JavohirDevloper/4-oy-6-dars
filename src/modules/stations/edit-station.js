import db from "../../db/index.js";
import bcryptjs from "bcryptjs";
import { NotFoundError } from "../../shared/errors/index.js";

export const editStation = async ({ id, ...changes }) => {
  const station = await db("stations").where({ id }).first();

  if (!station) {
    throw new NotFoundError("Station not found");
  }
  let hashPassword = {};
  if (changes.password) {
    hashPassword.password = await bcryptjs.hash(changes.password, 10);
  }
  return (
    await db("stations")
      .where({ id })
      .update({ ...changes, ...hashPassword })
      .returning("*")
  )[0];
};
