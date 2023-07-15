export const seed = function (knex) {
  return knex("station_path_links")
    .del()
    .then(function () {
      return knex("station_path_links").insert([
        { station_id: 2, linked_id: 1 },
      ]);
    });
};
