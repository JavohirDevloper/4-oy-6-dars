import db from "../../db/index.js";
import bcryptjs from "bcryptjs";
import { NotFoundError } from "../../shared/errors/index.js";

export const editMetro = async ({ id, ...changes }) => {
  const metro = await db("metros").where({ id }).first();

  if (!metro) {
    throw new NotFoundError("Metro not found");
  }
  let hashPassword = {};
  if (changes.password) {
    hashPassword.password = await bcryptjs.hash(changes.password, 10);
  }
  return (
    await db("metros")
      .where({ id })
      .update({ ...changes, ...hashPassword })
      .returning("*")
  )[0];
};
