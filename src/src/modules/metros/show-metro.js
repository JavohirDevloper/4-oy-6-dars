import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const showMetro = async ({ id }) => {
  const metro = await db("metros").where({ id }).first();

  if (!metro) {
    throw new NotFoundError("Metro not Found");
  }

  return metro;
};
