/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("practitioner_speciality", (table) => {
    table.increments();
    table.integer("practitioner_id").unsigned().notNull();
    table.foreign("practitioner_id").references("id").inTable("practitioner");
    table.integer("speciality_id").unsigned().notNull();
    table.foreign("speciality_id").references("id").inTable("speciality");
    table.timestamp("created_at").notNull().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNull().defaultTo(knex.fn.now());
    table.boolean("is_inactive").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("practitioner_speciality");
};
