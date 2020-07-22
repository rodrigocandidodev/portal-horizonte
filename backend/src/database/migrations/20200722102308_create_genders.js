exports.up = function(knex) {
    return knex.schema.createTable('genders', function(table){
        table.increments('id').primary();
        table.string('gender').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('genders');
};