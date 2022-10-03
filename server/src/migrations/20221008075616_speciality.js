/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("speciality", (table) => {
    table.increments();
    table.string("title", 128);
    table.string("description", 256);
    table.integer("created_by").unsigned().notNull();
    table.foreign("created_by").references("id").inTable("user");
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
  return knex.schema.dropTable("speciality");
};
