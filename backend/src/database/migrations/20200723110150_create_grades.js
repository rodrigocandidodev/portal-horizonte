exports.up = function(knex) {
    return knex.schema.createTable('grades', function(table){
        table.increments('id').primary();
        table.string('grade').notNullable();
        table.string('beginning_age').notNullable();
        table.integer('scholarity_id').unsigned();

        table.foreign('scholarity_id').references('id').inTable('scholarities');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('grades', function(table){
        table.dropForeign('scholarity_id');
    });
};