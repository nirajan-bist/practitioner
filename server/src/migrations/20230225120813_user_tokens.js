/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_tokens", (table) => {
    table.increments();
    table.integer("user_id").unsigned().notNull();
    table.foreign("user_id").references("id").inTable("user");
    table.boolean("is_access_token").notNull();
    table.boolean("is_active").notNull();
    table.text("token").notNull();
    table.timestamp("created_at").notNull().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNull().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_tokens");
};
