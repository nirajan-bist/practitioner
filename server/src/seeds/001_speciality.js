/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("speciality").del();
  await knex("speciality").insert([
    {
      title: "ICU",
      description:
        "An ICU specialist is a person who is a medicinal specialist trained in treating critically ill patients.",
      created_by: 1,
    },
  ]);
};
