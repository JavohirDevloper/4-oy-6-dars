export const up = function (knex) {
  return knex.schema.createTable("paths", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
    table.integer("metro_id").unsigned().notNullable();

    table
      .foreign("metro_id")
      .references("id")
      .inTable("metros")
      .onDelete("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("paths");
};
