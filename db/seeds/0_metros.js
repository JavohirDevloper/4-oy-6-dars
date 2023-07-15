export const seed = function (knex) {
  return knex("metros").del().then(function () {
     return knex("metros").insert([
        {
          id: 1,
          name: "Chilonzor",
        },
        {
          id: 2,
          name: "Mirzo Ulug'bek",
        },
        {
          id: 3,
          name: "Novza",
        },
        {
          id: 4,
          name: "Milliy Bo'g",
        },
        {
          id: 5,
          name: "Xalqlar do'stligi ",
        },
        {
          id: 6,
          name: "Paxtakor",
        },
      ]);
    });
};
