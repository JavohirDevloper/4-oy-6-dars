export const up = function (knex) {
  return knex.schema.createTable("path_links", function (table) {
    table.integer("path_id").unsigned().notNullable();
    table.integer("linked_id").unsigned().notNullable();

    table
      .foreign("path_id")
      .references("id")
      .inTable("paths")
      .onDelete("CASCADE");
    table
      .foreign("linked_id")
      .references("id")
      .inTable("paths")
      .onDelete("CASCADE");

    table.primary(["path_id", "linked_id"]);
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("path_links");
};
