import db from "../../db/index.js";
import bcryptjs from "bcryptjs";
import { NotFoundError } from "../../shared/errors/index.js";

export const editPath = async ({ id, ...changes }) => {
  const path = await db("paths").where({ id }).first();

  if (!path) {
    throw new NotFoundError("Path not found");
  }
  let hashPassword = {};
  if (changes.password) {
    hashPassword.password = await bcryptjs.hash(changes.password, 10);
  }
  return (
    await db("paths")
      .where({ id })
      .update({ ...changes, ...hashPassword })
      .returning("*")
  )[0];
};
