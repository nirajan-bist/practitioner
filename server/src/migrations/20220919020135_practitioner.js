/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("practitioner", (table) => {
    table.increments();
    table.string("fullname", 128);
    table.string("email", 128);
    table.string("contact", 20);
    table.date("dob");
    table.text("image_url");
    table.time("start_time");
    table.time("end_time");
    table.string("working_days", 16);
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
  return knex.schema.dropTable("practitioner");
};
