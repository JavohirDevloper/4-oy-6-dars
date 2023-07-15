/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("metros", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("metros");
};
