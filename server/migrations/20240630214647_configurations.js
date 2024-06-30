/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
 await knex.schema.createTable("configurations", table => {
    table.string("title");
    table.string("description");
    table.integer("authorId");
 });
 await knex.schema.createTable("configurations_parts", table => {
    table.integer("configurationId");
    table.integer("partId");

 }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable("configurations_parts");
  await knex.schema.dropTable("configurations");
};
