exports.up = function(knex) {
    return knex.schema.createTable('school_shifts', function(table){
        table.increments('id').primary();
        table.string('school_shift').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('school_shifts');
};