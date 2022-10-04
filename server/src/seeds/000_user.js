/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert([
    { email: "test@gmail.com", password: "$2a$10$j/TpZwnqEGpts2o/9NXcf.QhAz8FThTTsr52NOPHooUWKN/vkPTWm" },
  ]);
};
