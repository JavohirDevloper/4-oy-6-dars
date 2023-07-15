export const seed = function (knex) {
  return knex("path_links")
    .del()
    .then(function () {
      return knex("path_links").insert([{ path_id: 2, linked_id: 1 }]);
    });
};
