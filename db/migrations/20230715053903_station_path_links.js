export const up = function (knex) {
  return knex.schema.createTable("station_path_links", function (table) {
    table.integer("station_id").unsigned().notNullable();
    table.integer("linked_id").unsigned().notNullable();

    table
      .foreign("station_id")
      .references("id")
      .inTable("stations")
      .onDelete("CASCADE");
    table
      .foreign("linked_id")
      .references("id")
      .inTable("stations")
      .onDelete("CASCADE");

    table.primary(["station_id", "linked_id"]);
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("station_path_links");
};
