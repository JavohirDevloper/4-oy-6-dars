export const seed = function (knex) {
  return knex("metros").del().then(function () {
     return knex("metros").insert([
        {
          id: 1,
          name: "Metro A",
        },
        {
          id: 2,
          name: "Metro B",
        },
      ]);
    });
};
