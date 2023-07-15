export const seed = function (knex) {
  return knex("paths")
    .del()
    .then(function () {
      return knex("paths").insert([
        { id: 1, name: "Path 1", metro_id: 1 },
        { id: 2, name: "Path 2", metro_id: 1 },
      ]);
    });
};
