exports.up = function(knex) {
    return knex.schema.createTable('jobs', function(table){
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('department_id').unsigned();

        table.foreign('department_id').references('id').inTable('departments');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('jobs', function(table){
        table.dropForeign('department_id');
    });
};