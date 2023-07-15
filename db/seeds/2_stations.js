export const seed = async function (knex) {
  // Deletes all existing entries in the 'stations' table
  await knex("stations").del();

  // Inserts new station records
  const stations = [
    {
      id: 1,
      name: "Station 1",
      path_id: 1,
      forward_id: null,
      backward_id: null,
      has_path_link: false,
    },
    {
      id: 2,
      name: "Station 2",
      path_id: 1,
      forward_id: 3,
      backward_id: null,
      has_path_link: true,
    },
    // Add more seed data as needed
  ];

  // Use Knex's batchInsert to efficiently insert multiple rows at once
  await knex.batchInsert("stations", stations);

  console.log("Seed data inserted successfully.");
};
