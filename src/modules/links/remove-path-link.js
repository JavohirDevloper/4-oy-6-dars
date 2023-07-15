import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const removePathLink = async ({ id }) => {
  const station = await db("path_links").where({ id }).first();

  if (!station) {
    throw new NotFoundError("PathLink not found");
  }

  return (
    await db("path_links")
      .where({ id })
      .update({ is_deleted: true })
      .returning("*")
  )[0];
};
