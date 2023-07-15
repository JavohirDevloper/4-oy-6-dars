import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const removeMetro = async ({ id }) => {
  const metro = await db("metros").where({ id }).first();

  if (!metro) {
    throw new NotFoundError("Metro not found");
  }

  return (
    await db("metros").where({ id }).update({ is_deleted: true }).returning("*")
  )[0];
};
