/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("users", table => {
        table.increments("id").primary();
        table.string("username");
        table.string("passHash");
        table.string("firstName");
        table.string("lastName");
        table.string("role");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
