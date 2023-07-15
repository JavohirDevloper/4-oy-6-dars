export const up = function (knex) {
  return knex.schema.createTable("stations", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
    table.integer("path_id").unsigned().notNullable();
    table.integer("forward_id").unsigned();
    table.integer("backward_id").unsigned();
    table.boolean("has_path_link").defaultTo(false);

    table
      .foreign("path_id")
      .references("id")
      .inTable("paths")
      .onDelete("CASCADE");
    table
      .foreign("forward_id")
      .references("id")
      .inTable("stations")
      .onDelete("SET NULL");
    table
      .foreign("backward_id")
      .references("id")
      .inTable("stations")
      .onDelete("SET NULL");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("stations");
};
