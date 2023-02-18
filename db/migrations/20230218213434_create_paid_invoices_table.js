exports.up = function (knex) {
  return knex.schema.createTable("paid_invoices", function (table) {
    // Creates an auto-incrementing PK column called id
    table.increments("id").primary();
    table.string("payment_request").notNullable().unique();
    table.string("error");
    table.integer("value").notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  // Drops the entire table if it exists (opposite of createTable)
  // This is useful for rolling back migrations if something goes wrong
  return knex.schema.dropTableIfExists("invoices");
};
